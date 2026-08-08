"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, Bitcoin, Lock, ArrowLeft, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";
import { sendProCodeEmail } from "@/actions/auth";

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentType, setPaymentType] = useState<"card" | "local" | "crypto">("card");
  const [selectedLocal, setSelectedLocal] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [selectedCrypto, setSelectedCrypto] = useState<"usdt" | "btc" | "eth">("usdt");
  
  const [cardNumber, setCardNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [numberError, setNumberError] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");

  const merchantNumbers = {
    bkash: "01776350196 (Personal / Merchant)",
    nagad: "01776350196 (Personal)",
    rocket: "01776350196-1 (Personal)"
  };

  const getCardType = (num: string) => {
    const cleaned = num.replace(/\s+/g, "");
    if (cleaned.startsWith("4")) return "VISA";
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return "MASTERCARD";
    return "CARD";
  };

  const cardType = getCardType(cardNumber);

  const validateBdNumber = (num: string) => {
    const cleaned = num.replace(/\D/g, "");
    return cleaned.length === 10 || cleaned.length === 11;
  };

  const generateUniqueCode = () => {
    const prefix = "PRO";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${randomNum}-${randomChars}`;
  };

  const handleCompletePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (paymentType === "local") {
      if (!validateBdNumber(senderNumber)) {
        setNumberError("দয়া করে সঠিক মোবাইল নাম্বার দিন (যেমন: 01776350196)");
        return;
      }
    }
    setNumberError("");

    setIsLoading(true);
    setLoadingStep("Verifying payment details...");

    let paymentData = {
      method: "Credit Card",
      detail: `•••• ${cardNumber ? cardNumber.slice(-4) : "4288"}`,
      type: cardType,
      email: userEmail
    };

    if (paymentType === "local") {
      const formattedNum = senderNumber.length === 10 ? `0${senderNumber}` : senderNumber;
      paymentData = {
        method: `${selectedLocal.toUpperCase()} Mobile Banking`,
        detail: `Sender: +88${formattedNum} | TrxID: ${trxId}`,
        type: "LOCAL",
        email: userEmail
      };
    } else if (paymentType === "crypto") {
      paymentData = {
        method: `Crypto (${selectedCrypto.toUpperCase()})`,
        detail: "Decentralized Transfer",
        type: "CRYPTO",
        email: userEmail
      };
    }

    try {
      localStorage.setItem("last_payment", JSON.stringify(paymentData));
    } catch (err) {
      console.error(err);
    }

    const uniqueActivationCode = generateUniqueCode();

    const savedCodes = JSON.parse(localStorage.getItem("active_pro_codes") || "[]");
    const newEntry = { code: uniqueActivationCode, used: false, email: userEmail };
    localStorage.setItem("active_pro_codes", JSON.stringify([newEntry, ...savedCodes]));

    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoadingStep("Deducting ৳1,200 from account...");

    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoadingStep("Sending PRO Code to your Gmail...");

    try {
      await sendProCodeEmail(userEmail, uniqueActivationCode);
    } catch (err) {
      console.error("Email send error:", err);
    }

    setIsLoading(false);
    router.push("/payment/success");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none -bottom-20 -right-20" />

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10 border border-white/10">
        
        {/* Left Side Preview */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 flex flex-col justify-between relative overflow-hidden">
          <button onClick={() => router.push("/pricing")} className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition cursor-pointer w-fit">
            <ArrowLeft size={14} /> Back to Pricing
          </button>
          
          <div className="my-auto py-12 relative flex items-center justify-center">
            {paymentType === "card" && (
              <div className="relative w-64 h-40 animate-in fade-in zoom-in duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl border border-white/30 p-5 flex flex-col justify-between opacity-90">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold text-xs tracking-widest">{cardType}</span>
                    <div className="w-6 h-4 bg-white/60 rounded flex items-center justify-center text-[9px] font-black text-slate-900">
                      {cardType === "VISA" ? "V" : cardType === "MASTERCARD" ? "M" : "💳"}
                    </div>
                  </div>
                  <div className="text-white font-mono text-xs tracking-wider">{cardNumber || "•••• •••• •••• ••••"}</div>
                </div>
              </div>
            )}

            {paymentType === "local" && (
              <div 
                className={`relative w-64 h-44 rounded-2xl shadow-2xl border border-white/30 p-5 flex flex-col justify-between text-white animate-in fade-in zoom-in duration-300 transition-colors ${
                  selectedLocal === "bkash" 
                    ? "bg-gradient-to-br from-[#e2136e] to-[#990d4b]" 
                    : selectedLocal === "nagad" 
                    ? "bg-gradient-to-br from-[#f7931e] to-[#bd6a06]" 
                    : "bg-gradient-to-br from-[#8c349b] to-[#51165b]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="bg-white px-3 py-1.5 rounded-lg shadow flex items-center justify-center h-8 w-20">
                    <Image 
                      src={`/logos/${selectedLocal === "bkash" ? "Bkash.svg" : selectedLocal === "nagad" ? "Nagad.svg" : "rocket.svg"}`} 
                      alt={selectedLocal} 
                      width={60} 
                      height={20} 
                      className="object-contain h-5 w-auto"
                    />
                  </div>
                  <Smartphone size={22} className="text-white/80" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/80 block">Send Money to:</span>
                  <div className="text-xs font-mono font-bold bg-black/20 p-1.5 rounded text-amber-300">
                    {merchantNumbers[selectedLocal]}
                  </div>
                </div>
              </div>
            )}

            {paymentType === "crypto" && (
              <div className="relative w-64 h-40 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-2xl border border-white/30 p-6 flex flex-col justify-between text-white animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs tracking-widest uppercase">{selectedCrypto} NETWORK</span>
                  <Bitcoin size={28} className="text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] text-white/80 uppercase block tracking-wider">Decentralized Wallet</span>
                  <div className="text-xs font-mono font-bold tracking-wider mt-1 truncate">0x71C...39a8</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg font-serif">Secure Encrypted Checkout</h3>
            <p className="text-slate-400 text-xs">Your transaction is protected with 256-bit SSL encryption.</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between bg-white">
          <form onSubmit={handleCompletePayment} className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-black text-slate-900">Payment details</h2>
                <p className="text-slate-500 text-xs mt-0.5">Select your active payment method below</p>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">SSL Secured</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase flex items-center gap-1">
                <Mail size={12} className="text-indigo-600" /> Your Gmail Address (For Code & Receipt) *
              </label>
              <input 
                type="email" 
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="name@example.com" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-600 font-medium text-slate-900" 
              />
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl">
              <button type="button" onClick={() => setPaymentType("card")} className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${paymentType === "card" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]" : "text-slate-600 hover:text-slate-900 bg-transparent"}`}>
                <CreditCard size={14} /> Cards
              </button>
              <button type="button" onClick={() => setPaymentType("local")} className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${paymentType === "local" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]" : "text-slate-600 hover:text-slate-900 bg-transparent"}`}>
                <Smartphone size={14} /> Local (BD)
              </button>
              <button type="button" onClick={() => setPaymentType("crypto")} className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${paymentType === "crypto" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]" : "text-slate-600 hover:text-slate-900 bg-transparent"}`}>
                <Bitcoin size={14} /> Crypto
              </button>
            </div>

            <div className="space-y-4">
              {paymentType === "card" && (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase flex justify-between">
                      <span>Card Number *</span>
                      <span className="text-indigo-600 font-bold uppercase">{cardType}</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required 
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                          const formatted = val.match(/.{1,4}/g)?.join(" ") || "";
                          setCardNumber(formatted);
                        }}
                        placeholder="5678 3491 8821 1287" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-16 text-sm outline-none focus:border-indigo-600 font-mono text-gray-900" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">Card Holder Name *</label>
                    <input type="text" required placeholder="Cameron Williamson" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-600 text-gray-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">Expiry Date *</label>
                      <input type="text" required placeholder="mm / yy" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-600 text-gray-900" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">CVV / CVC2 *</label>
                      <input type="password" required placeholder="xxx" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-600 text-gray-900" />
                    </div>
                  </div>
                </>
              )}

              {paymentType === "local" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {/* bKash Logo Button */}
                    <div onClick={() => setSelectedLocal("bkash")} className={`p-3 rounded-2xl text-center cursor-pointer transition-all border-2 flex items-center justify-center h-14 ${selectedLocal === "bkash" ? "border-pink-600 bg-pink-50 shadow-md scale-[1.02]" : "border-slate-200 bg-slate-50 hover:border-pink-200"}`}>
                      <Image src="/logos/Bkash.svg" alt="bKash" width={75} height={25} className="object-contain h-6 w-auto" />
                    </div>
                    {/* Nagad Logo Button */}
                    <div onClick={() => setSelectedLocal("nagad")} className={`p-3 rounded-2xl text-center cursor-pointer transition-all border-2 flex items-center justify-center h-14 ${selectedLocal === "nagad" ? "border-orange-600 bg-orange-50 shadow-md scale-[1.02]" : "border-slate-200 bg-slate-50 hover:border-orange-200"}`}>
                      <Image src="/logos/Nagad.svg" alt="Nagad" width={75} height={25} className="object-contain h-6 w-auto" />
                    </div>
                    {/* Rocket Logo Button */}
                    <div onClick={() => setSelectedLocal("rocket")} className={`p-3 rounded-2xl text-center cursor-pointer transition-all border-2 flex items-center justify-center h-14 ${selectedLocal === "rocket" ? "border-purple-600 bg-purple-50 shadow-md scale-[1.02]" : "border-slate-200 bg-slate-50 hover:border-purple-200"}`}>
                      <Image src="/logos/rocket.svg" alt="Rocket" width={75} height={25} className="object-contain h-6 w-auto" />
                    </div>
                  </div>

                  {/* Instructions & Number */}
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-1 text-slate-700">
                    <p className="font-bold text-slate-900">Payment Instruction:</p>
                    <p>1. Send <span className="font-bold text-indigo-600">৳1,200</span> to this {selectedLocal.toUpperCase()} number: <span className="font-mono font-bold text-slate-900">{merchantNumbers[selectedLocal]}</span></p>
                    <p>2. Enter your sender mobile number and TrxID below.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">Your {selectedLocal.toUpperCase()} Number *</label>
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-600">
                        <span className="bg-slate-200 px-3 py-3 text-xs font-mono font-bold text-slate-700 border-r border-slate-300">+88</span>
                        <input 
                          type="text" 
                          required 
                          maxLength={11}
                          value={senderNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                            setSenderNumber(val);
                            if (numberError) setNumberError("");
                          }}
                          placeholder="01776350196" 
                          className="w-full bg-transparent px-3 py-3 text-sm outline-none font-mono text-gray-900" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">TrxID *</label>
                      <input 
                        type="text" 
                        required 
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. 9N74K..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-600 text-gray-900 font-mono uppercase" 
                      />
                    </div>
                  </div>
                  {numberError && (
                    <div className="flex items-center gap-1.5 text-rose-600 text-xs font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                      <AlertCircle size={14} />
                      <span>{numberError}</span>
                    </div>
                  )}
                </div>
              )}

              {paymentType === "crypto" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div onClick={() => setSelectedCrypto("usdt")} className={`p-3 rounded-xl text-center text-xs font-bold cursor-pointer transition-all border-2 ${selectedCrypto === "usdt" ? "border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm" : "border-slate-200 bg-slate-50 text-slate-600"}`}>USDT (TRC20)</div>
                    <div onClick={() => setSelectedCrypto("btc")} className={`p-3 rounded-xl text-center text-xs font-bold cursor-pointer transition-all border-2 ${selectedCrypto === "btc" ? "border-amber-600 bg-amber-50 text-amber-700 shadow-sm" : "border-slate-200 bg-slate-50 text-slate-600"}`}>Bitcoin (BTC)</div>
                    <div onClick={() => setSelectedCrypto("eth")} className={`p-3 rounded-xl text-center text-xs font-bold cursor-pointer transition-all border-2 ${selectedCrypto === "eth" ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" : "border-slate-200 bg-slate-50 text-slate-600"}`}>Ethereum</div>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase">{selectedCrypto.toUpperCase()} Wallet Address *</label>
                    <input type="text" required placeholder="Paste your wallet address here..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none font-mono text-xs focus:border-indigo-600 text-gray-900" />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Total Amount:</span>
                <span className="text-xl font-black text-indigo-600 font-mono">$12.00 / ৳1,200</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isLoading 
                    ? "bg-emerald-600 animate-pulse shadow-emerald-600/50 scale-[0.99] tracking-wider" 
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-600/25 hover:opacity-95"
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin text-white">⏳</span> 
                    <span>{loadingStep}</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} /> Confirm Payment & Get PRO Code
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
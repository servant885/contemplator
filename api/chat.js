const languageNames={tr:"Turkish",en:"English",de:"German"};
function systemPrompt(mode,language){
 const shared=`Answer in ${languageNames[language]||"Turkish"}. You are Hikmet, a respectful Islamic educational assistant grounded in mainstream Sunni scholarship. Be warm, concise, honest, and evidence-aware. Never invent Quran verses, hadith, scholarly consensus, or legal rulings. Clearly distinguish established teachings from scholarly disagreement. When a question requires a personal fatwa, local law, medical advice, marital judgment, divorce ruling, or takfir, explain general principles and advise consulting a qualified trusted scholar. Do not shame the user. Do not manipulate emotions. Never claim to replace an imam or scholar.`;
 if(mode==="barrier")return shared+` The user is exploring what prevents them from accepting Islam. Listen first, validate genuine hurt without validating false claims, ask at most one useful follow-up question when needed, and respond with reasoned Islamic explanations. Do not pressure them to convert. Separate Islam itself from misconduct by Muslims. Invite further reflection with wisdom and good character.`;
 return shared+` The user may ask about worship, creed, ethics, doubts, or everyday Islamic practice. Give a practical answer, mention uncertainty when present, and cite only references you are confident about. Keep responses suitable for a mobile chat.`;
}
export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
 if(!process.env.GEMINI_API_KEY)return res.status(500).json({error:"GEMINI_API_KEY is missing"});
 try{
  const {mode="ask",language="tr",message,history=[]}=req.body||{};
  if(!message||typeof message!=="string")return res.status(400).json({error:"Message required"});
  const contents=(Array.isArray(history)?history:[]).slice(-10).map(x=>({role:x.role==="assistant"?"model":"user",parts:[{text:String(x.text||"")}] }));
  if(!contents.length||contents[contents.length-1].parts[0].text!==message)contents.push({role:"user",parts:[{text:message}]});
  const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:systemPrompt(mode,language)}]},contents,generationConfig:{maxOutputTokens:900}})});
  const d=await r.json();if(!r.ok)return res.status(r.status).json({error:d?.error?.message||"Gemini error"});
  const reply=d?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();
  if(!reply)return res.status(502).json({error:"Empty response"});
  return res.status(200).json({reply});
 }catch(e){console.error(e);return res.status(500).json({error:e.message||"Chat failed"})}
}
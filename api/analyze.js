const langs={tr:"Turkish",en:"English",de:"German",es:"Spanish",fr:"French",pt:"Portuguese",ru:"Russian",zh:"Simplified Chinese",id:"Indonesian",ar:"Arabic",ur:"Urdu",hi:"Hindi"};
export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
 if(!process.env.GEMINI_API_KEY)return res.status(500).json({error:"GEMINI_API_KEY is missing"});
 try{
  const {image,language="tr"}=req.body||{};
  const m=image?.match(/^data:(image\/[\w.+-]+);base64,(.+)$/s);
  if(!m)return res.status(400).json({error:"Valid image required"});
  const prompt=`You are the reflection module of Hikmet, an Islamic learning app. Analyze this image in ${langs[language]||"Turkish"}. Be scientifically careful, spiritually gentle, and concise. Do not claim unseen knowledge or a specific divine intention. Never invent Quran verses. Include a verse only if you are highly confident in its exact meaning and reference; otherwise use empty strings. Do not identify real people or infer sensitive traits. Return JSON only.`;
  const schema={type:"OBJECT",properties:{title:{type:"STRING"},observation:{type:"STRING"},science:{type:"STRING"},reflection:{type:"STRING"},question:{type:"STRING"},quran_reference:{type:"STRING"},quran_text:{type:"STRING"}},required:["title","observation","science","reflection","question","quran_reference","quran_text"]};
  const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:prompt},{inlineData:{mimeType:m[1],data:m[2]}}]}],generationConfig:{maxOutputTokens:1200,responseMimeType:"application/json",responseSchema:schema}})});
  const d=await r.json();if(!r.ok)return res.status(r.status).json({error:d?.error?.message||"Gemini error"});
  const text=d?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();
  return res.status(200).json(JSON.parse(text));
 }catch(e){console.error(e);return res.status(500).json({error:e.message||"Analysis failed"})}
}
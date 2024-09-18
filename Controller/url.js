const shortid = require("shortid");
const url = require("../Model/url");

// Handle creating short URL
async function handleShortUrl(req, res) {
  const { url: getUrl } = req.body;
  console.log(getUrl);
  if(!getUrl){
    return res.status(400).send({ error: "URL is required" });
  }
  const getId = shortid.generate();
  console.log(`For ${getUrl} id is generated ${getId}`);
  try {
    await url.create({
      shortId: getId,
      redirectURL: getUrl,
      visitHistory: [],
    });
    console.log("Added in databases");
    
    return res.status(201).send({ msg: getId });
  } catch (error) {
    return res.status(500).send({msg:"failed to create short url"})
  }
}

// Handle redirect using short URL
 async function getShortURl(req,res) {
  const getId = req.params.shortId;
  const getEntry = await url.findOneAndUpdate(
    { shortId: getId }, 
    { $push: { visitHistory: {
      timeStamp:Date.now() } }}
  );
  
  if(getEntry){
    console.log("Your value is : " , getEntry);
  }
  else{
    console.log("not found");
    
  }
  res.redirect(getEntry.redirectURL)
 }


 async function getAnalysis(req, res) {
  const shortId = req.params.shortId;

  try {
    const data = await url.findOne({ shortId });

    if (data) {
      console.log(data);

      return res.json({
        totalClicks: data.visitHistory.length,
        analytics: data.visitHistory,
      });
    } else {
      return res.status(404).send({ msg: "Short URL not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ msg: "Server error" });
  }
}


module.exports = { handleShortUrl, getShortURl ,getAnalysis};

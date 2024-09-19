const shortid = require("shortid");
const url = require("../Model/url");

// Handle creating short URL
async function handleShortUrl(req, res) {
  const { url: getUrl } = req.body;

  if (!getUrl) {
    return res.status(400).send({ error: 'URL is required' });
  }

  const getId = shortid.generate();

  try {
    await url.create({
      shortId: getId,
      redirectURL: getUrl,
      visitHistory: [],
    });

    // Render the home view and pass the generated ID
    return res.render('home', { id: getId });
  } catch (error) {
    return res.status(500).send({ msg: 'Failed to create short URL' });
  }
}

// Handle redirect using short URL
async function getShortURl(req, res) {
  const getId = req.params.shortId;
  
  try {
    // Find the document and update the visitHistory
    const getEntry = await url.findOneAndUpdate(
      { shortId: getId }, 
      { $push: { visitHistory: { timeStamp: Date.now() } } },
      { new: true } // Return the updated document
    );
    
    if (!getEntry) {
      console.log(`Short URL with ID ${getId} not found`);
      return res.status(404).send({ msg: 'Short URL not found' });
    }
    
    console.log('Found entry:', getEntry);

    // Redirect to the original URL
    return res.redirect(getEntry.redirectURL);
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send({ msg: 'Server error' });
  }
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

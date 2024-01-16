// async function with await unravels the promises
async function getQuote() {
  try {
    let response = await fetch("https://zenquotes.io/api/today/")

    let data = await response.json()
    return data[0].q
  }
  catch(error){
      console.log(error)
  }
}

exports.getQuote = getQuote
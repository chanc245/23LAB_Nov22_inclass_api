const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

function checkValueOrNotFound(value) {
  return value ? value : "Not Found";
}

const makeRequest = async function (searchTerm) {
  try {
    const response = await fetch(`${baseUrl}/search?q=${searchTerm}`);
    const collection = await response.json();
    // console.log(collection);

    // get total number and randomly pick a ID from the total result
    console.log(`There are [${collection.total}] artworks in your search term [${searchTerm}] `);
    let randomArtworkID = Math.floor(Math.random() * (collection.total + 1));
    console.log(`A randonly selected artworkID [${randomArtworkID}] from [${collection.total}] artworks`)

    // get that specific artwork
    const artwork = await fetch(`${baseUrl}/objects/${collection.objectIDs[randomArtworkID]}`);
    const artworkJson = await artwork.json()
    // console.log(artworkJson)

    // some possible output 
    console.log("Artist Name: " + artworkJson.artistDisplayName)
    console.log("Department: " + artworkJson.department)
    console.log("Accession Year: " + artworkJson.accessionYear)
    console.log("Image Link: " + artworkJson.primaryImage)

    // changing the html contents 
    document.getElementById('result').textContent = `A randonly selected artworkID [${randomArtworkID}] from [${collection.total}] artworks`;

    document.getElementById('artistName').textContent = "Artist Name: " + checkValueOrNotFound(artworkJson.artistDisplayName);
    document.getElementById('department').textContent = "Department: " + checkValueOrNotFound(artworkJson.department);
    document.getElementById('accessionYear').textContent = "Accession Year: " + checkValueOrNotFound(artworkJson.accessionYear);
    document.getElementById('primaryImage').src = artworkJson.primaryImage;

    document.querySelector('.artwork-container').style.display = 'block';
    document.querySelector('.hint').style.display = 'block';
    document.getElementById('result').style.display = 'block';
  } catch (error) {
    console.error(error);
  }
};

document.getElementById('searchButton').addEventListener('click', async function () {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value;
  await makeRequest(searchTerm);
});

document.getElementById('searchInput').addEventListener('keyup', async function (event) {
  if (event.key === 'Enter') {
    const searchTerm = event.target.value;
    await makeRequest(searchTerm);
  }
});
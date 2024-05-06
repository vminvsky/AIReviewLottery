function checkLottery() {
  const searchInput = document.getElementById('searchBar').value.toLowerCase();
  const matchedPapers = papers.filter(paper => paper.title.toLowerCase().includes(searchInput));

  if (matchedPapers.length > 0) {
    const firstMatch = matchedPapers[0]; // Assuming first match is used for demonstration
    if (firstMatch.isAI) {
      window.location.href = 'win-page.html';
    } else {
      window.location.href = 'lose-page.html';
    }
  } else {
    alert('No matching papers found.'); // Improved user feedback
  }
}
function updateSearchResults() {
  const searchInput = document.getElementById('paperId').value.toLowerCase();
  const searchResultsElement = document.getElementById('searchResults');

  if (searchInput.length === 0) {
    searchResultsElement.innerHTML = ''; // Clear results when input is empty
    return;
  }

  const matchedPapers = papers.filter(paper => paper.title.toLowerCase().includes(searchInput));
  if (matchedPapers.length > 0) {
    const resultsHtml = matchedPapers.slice(0, 5).map(paper =>
      `<div onclick="selectPaper('${paper.id}', '${paper.isAI}', '${paper.decision}')" class="search-result-item">
                ${paper.title}
            </div>`
    ).join('');
    searchResultsElement.innerHTML = resultsHtml;
  } else {
    searchResultsElement.innerHTML = '<div class="search-result-item">No matches found</div>';
  }
}

function selectPaper(id, isAI, decision) {

  showLoadingOverlay(isAI);

  setTimeout(() => {
    document.getElementById('paperId').value = ''; // Empty paperId element
    updateSearchResults(); // Update search results
    hideLoadingOverlay(isAI);

    // Store the isAI and decision values in session storage
    sessionStorage.setItem('isAI', isAI);
    sessionStorage.setItem('decision', decision);

    window.location.href = 'results.html';

  }, 3000); // Wait for 3 seconds before redirecting
}

function showLoadingOverlay(isAI) {
  if (isAI == 'true') {
    document.getElementById('loadingGif').src = 'assets/lottery-win.gif';
  } else {
    document.getElementById('loadingGif').src = 'assets/lottery-lose.gif';
  }

  document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoadingOverlay() {
  document.getElementById('loadingOverlay').style.display = 'none';
}
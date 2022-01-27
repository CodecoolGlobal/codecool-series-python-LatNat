function showOnlyFivePages(currentPage, pageCount) {
    let lowerLimit = Number(currentPage) - 2;
    let upperLimit = Number(currentPage) + 2;

    if (upperLimit > pageCount) {
        lowerLimit -= (upperLimit - pageCount);
        upperLimit = pageCount;
    }
    if (lowerLimit <= 0) {
        upperLimit += ((lowerLimit - 1) * ( - 1));
        lowerLimit = 1;
    }

    upperLimit = upperLimit > pageCount ? pageCount : upperLimit;

    return { lowerLimit: lowerLimit, upperLimit: upperLimit };
}

function createLinkForPage(pageNumber, totalNumOfPages) {
    console.log('creating link...for', pageNumber)
    const pageLink = document.createElement('a');
    if (pageNumber < 1 || pageNumber > totalNumOfPages) {
        pageLink.href = "#";
    } else {
        pageLink.href = `${pageNumber}`;
    }
    return pageLink
}


function clearElement(element) {
    console.log('clearElement')
    while (element.hasChildNodes()) {
        element.lastChild.remove();
    }
}

function createPagination(currentPage, totalNumOfPages) {
    console.log('createPagination');
    const paginationCard = document.querySelector('.pagination');
    // clearElement(paginationCard);
    const stepBackLink = createLinkForPage(currentPage-1, totalNumOfPages);
    stepBackLink.innerText = '«';
    paginationCard.appendChild(stepBackLink);
    const stepForwardLink = createLinkForPage(currentPage+1, totalNumOfPages);
    stepForwardLink.innerText = '»';
    const range = showOnlyFivePages(currentPage, totalNumOfPages);
    for (let i = range.lowerLimit; i <= range.upperLimit; i++) {
        let pageLink = createLinkForPage(i, totalNumOfPages);
        if (i === currentPage) {
            pageLink.className = "active";
        }
        pageLink.innerText = i;
        paginationCard.appendChild(pageLink);
    }
    paginationCard.appendChild(stepForwardLink);
    console.log(paginationCard);
}
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

function createLinkForPage(pageNumber, totalNumOfPages, category, direction) {
    const pageLink = document.createElement('a');
    if (pageNumber < 1 || pageNumber > totalNumOfPages) {
        pageLink.href = "#";
    } else {
        let pageUrl = new URL(`http://127.0.0.1:5000/shows/top-rated/${pageNumber}`);
        pageUrl.searchParams.append('category', category);
        pageUrl.searchParams.append('order', direction);
        pageLink.href = pageUrl.href;
    }
    return pageLink
}


function clearElement(element) {
    while (element.hasChildNodes()) {
        element.lastChild.remove();
    }
}

function createPagination(currentPage, totalNumOfPages) {
    const parameters = document.querySelector("input[type=hidden]");
    const category = parameters.dataset.orderedBy;
    const direction = parameters.dataset.direction;
    const paginationCard = document.querySelector('.pagination');
    const stepBackLink = createLinkForPage(currentPage-1, totalNumOfPages, category, direction);
    stepBackLink.innerText = '«';
    paginationCard.appendChild(stepBackLink);
    const stepForwardLink = createLinkForPage(currentPage+1, totalNumOfPages, category, direction);
    stepForwardLink.innerText = '»';
    const range = showOnlyFivePages(currentPage, totalNumOfPages);
    for (let i = range.lowerLimit; i <= range.upperLimit; i++) {
        let pageLink = createLinkForPage(i, totalNumOfPages, category, direction);
        if (i === currentPage) {
            pageLink.className = "active";
        }
        pageLink.innerText = i;
        paginationCard.appendChild(pageLink);
    }
    paginationCard.appendChild(stepForwardLink);
}
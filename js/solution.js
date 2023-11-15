'use strict';

(function () {
    const listElements = document.getElementById('ulId').children;

    for (const element of listElements) {
        console.log(element);
    }

    console.log(listElements.length);

    const elementsText = Array.from(listElements).map(
        (item) => item.textContent
    );

    console.log(elementsText);
})();

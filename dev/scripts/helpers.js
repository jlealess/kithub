export function sortArray(array, attr) {

    function compare(a, b) {
        const categoryA = (a[attr] !== null && a[attr] !== undefined) ? a[attr].toUpperCase() : '';
        const categoryB = (b[attr] !== null && b[attr] !== undefined) ? b[attr].toUpperCase() : '';

        let comparison = 0;
        if (categoryA > categoryB) {
            comparison = 1;
        } else if (categoryA < categoryB) {
            comparison = -1;
        }
        return comparison;
    }

    let sortedProducts = array.sort(compare);
    return sortedProducts;
}

export function randoNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function multipleRandoNums(max, numToReturn) {
    const randomItems = [];
    for (let i = 0; i < numToReturn; i++) {
        randomItems.push(randoNum(max));
    }
    return randomItems;
}

export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
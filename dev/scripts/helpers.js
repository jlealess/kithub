export function rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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

export function multipleRando(arr, num) {
    const numItems = (num > arr.length) ? arr.length : num;
    const randomItems = [];
    for (let i = 0; i < numItems; i++) {
        randomItems.push(rando(arr));
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
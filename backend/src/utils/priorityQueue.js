// to implement priority Queue , we are making our own class, here sorting does work in O(nlogn)
// for large dataset we can use min-heap or heap.js 

// we need this when we want to move to the nearest according to edge neighbour after we have visited 
// our current node , this always provides us the cheapest bank first 

class PriorityQueue {
    constructor() {
        this.queue = []; 
    }

    enque(bank, cost) {
        this.queue.push({bank, cost}); 
        // here a and b, are 1st and 2nd objects, so sort method in js by default treats elements as string, 
        // but we dont want that, that is why this ensures that if a.cost - b.cost < 0 then a comes before b 
        // and vice-versa
        this.queue.sort((a, b) => a.cost - b.cost); 
    }

    deque() {
        // shift() removes the first item of an array , similar to pop method
        return this.queue.shift(); 
    }

    isEmpty() {
        return this.queue.length === 0 ; 
    }
}

export default PriorityQueue; 



/*
In JavaScript, array.sort() by default converts elements to strings and sorts them lexicographically 
(alphabetically). However, for numerical sorting (like sorting costs in Dijkstra),
we need a custom comparator function. 
*/
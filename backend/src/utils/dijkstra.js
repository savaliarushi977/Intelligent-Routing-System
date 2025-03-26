// This handles the implementation of the dijkstra's algorithm 

import PriorityQueue  from "./priorityQueue.js";


export const dijkstraCheap = (graph, charges, start, end) => {
    
    //declare variables 
    const pq = new PriorityQueue();  // holds the neighbouring nodes 
    const distances = new Map(); // stores the distances from the start node provided 
    const previous = new Map(); // stores the previous route for a node(previous closest neighbour)

    //intialise variables 
    // _, because we want to ignore the values and only focus on keys 
    graph.forEach((_, bank) => {
        distances.set(bank, Infinity);  // initially we set the distances to be infinity and previous bank to be null
        previous.set(bank, null); 
    }); 
    distances.set(start, charges.get(start) ||  0); // starting vertex must have 0 distance 
    pq.enque(start, charges.get(start) || 0); 


    // now we will pop the pq until it is empty and fill the nearest neighbour to it, by default 
    // it acts as min-heap so extracted item would be minimum 
    while(!pq.isEmpty()) {
        // here start and end are FromBIC and ToBIC and bank and cost are the current vertex and edge 
        const {bank, cost} = pq.deque();   // shift an item 

        if(bank == end) break ; // stop when we reach the destination 

        if(!graph.has(bank)) continue ; // if graph doesnt have the bank then skip 

        // if it does, then we talk about its neighbour and iterate over them 
        // graph.get(bank) : array of neighbouring banks for the bank
        for( const {bank : neighbour, cost : neighbourCost} of graph.get(bank) ){
            let newCost  = distances.get(bank) + neighbourCost; // updating the cost for the neighbour 
            
            //updating the distance map, previous map and adding node to the pq (which shows the no of unvisited nodes)
            if( newCost < distances.get(neighbour)){
                distances.set(neighbour, newCost); 
                previous.set(neighbour , bank); 
                pq.enque(neighbour, newCost); // that vertex is unvisited 
            }
        }
    }

    // now we have distance and the previous map
    // constructing the route by reverse travelling from the ToBIC to FromBIC
    let path = []; 
    let step = end; 
    while(step){
        path.push(step); 
        step = previous.get(step); 
    }
    path.reverse(); 

    return {route : path, totalCost : distances.get(end)}; 

}; 










export const dijkstraFast = (graph, start, end) => {

    // 1. declare variables and intialise them 
    // 2. traverse the graph and upadate the distances array 
    // 3. return route and timetaken 

    // we want to store (bank : distance) for the distances map 
    // we want to store (bank : previousRoute) for the previous map 
    const distances = new Map();  // store the least timetaken 
    const previous = new Map();  // store the route 
    const pq = new PriorityQueue(); 

    // forEach method for objects takes (value, key) as params 
    graph.forEach((_, bank) => {
        distances.set(bank, Infinity); 
        previous.set(bank, null); 
    }); 
    // we are assuming that the first bank takes 0 time 
    distances.set(start, 0); 
    pq.enque(start, 0); 

    while(!pq.isEmpty()){
        const {bank, time} = pq.deque(); 

        // dont need to explore its neighbours 
        if(bank == end) break; // stop if we reach the destination

        // it means that it doesn't have any neighbours 
        if(!graph.has(bank)) continue; // skip if bank has no connection

        // now we want to traverse the graph.get(bank) array and update distances for them 
        for(const {bank : neighbour, time : neighbourTime} of graph.get(bank)){
            let newTime = distances.get(bank) + neighbourTime; // calculating the new time 
            //updating the distance only if a shorter distance is found 
            if(newTime < distances.get(neighbour)){
                distances.set(neighbour, newTime); 
                previous.set(neighbour, bank); 
                pq.enque(neighbour, newTime); 
            }
            
        }
    }

    // construct the path 
    let path = [];
    let step = end ; 
    while(step){
        path.push(step); 
        step = previous.get(step); 
    }
    path.reverse(); 

    return {route : path, time: distances.get(end)}
}; 



/* 
-> for...in is used for objects if we want to traverse it 
-> for...of is used for array if we want to traverse it 


1. BanksData from the banks.csv file : 
[
    { "BIC": "A", "Charge": 10 },
    { "BIC": "B", "Charge": 5 },
    { "BIC": "C", "Charge": 20 }
]

2. LinksData from the links.csv file : 
[
    { "FromBIC": "A", "ToBIC": "B", "TimeTakenInMinutes" : 89 },
    { "FromBIC": "B", "ToBIC": "C" , "TimeTakenInMinutes" : 73},
    { "FromBIC": "A", "ToBIC": "C", "TimeTakenInMinutes" : 83 }
]

3. Graph by the buildGraph Function for this : 
{
    "A": [ { "bank": "B", "cost": 5 }, { "bank": "C", "cost": 20 } ],
    "B": [ { "bank": "C", "cost": 20 } ],
    "C": []
}

4. for dijkstra algorithm the input and output are : 
(INPUT) :   
    const graph = {
    "A": [ { bank: "B", cost: 5 }, { bank: "C", cost: 20 } ],
    "B": [ { bank: "C", cost: 20 } ],
    "C": []
};

const charges = new Map([
    ["A", 10],
    ["B", 5],
    ["C", 20]
]);

console.log(dijkstra(graph, charges, "A", "C"));    


(OUTPUT) : 
{
    "route": ["A", "B", "C"],
    "totalCost": 25
}

for a get request at api/cheapestRoute 
input : {
    "fromBank": "ADDBINBBXXX",
    "toBank": "BNPAFRPPXXX"
}

output in the response : 
{
    "route": ["ADDBINBBXXX", "CICIFRPPXXX", "BNPAFRPPXXX"],
    "totalCost": 32
}

*/
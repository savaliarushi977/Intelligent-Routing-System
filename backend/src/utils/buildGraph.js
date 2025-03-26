// file to make a graph


/**
BuildGraph function here, is responsible for building the graph and the charges which both are Map objects. 
using the linksData and the BanksData from the files. 
new Map() – creates the map.
map. set(key, value) – stores the value by the key.
map. get(key) – returns the value by the key, undefined if key doesn't exist in map.
map.has(key) – returns true if the key exists, false otherwise
-> (the graph map shows the connection and distance between each nodes , it enlists all the nodes)

-> .forEach() , method is used to iterate over both array and object but for objects the syntax is like this , 
    map.forEach((value, key) => {}); , 1st parm is value and 2nd is key 

 */

export const buildGraphCheap = (banksData, linksData) => {
    // intialise maps 
    const graph = new Map();    // like dictionary 
    const charges = new Map(); 


    // build the charges map 
    banksData.forEach(({ BIC, Charge }) => {
        charges.set(BIC, Charge); 
    });

    // building the graph map 
    linksData.forEach(({FromBIC, ToBIC}) => {
        if(!graph.has(FromBIC)) graph.set(FromBIC, []); // setting the value of FromBIC if there is None 
        if(!graph.has(ToBIC)) graph.set(ToBIC, []); 

        // linksData has fromBIC, ToBIC, TimeTaken, so using it to set links 
        graph.get(FromBIC).push({bank : ToBIC, cost : charges.get(ToBIC) || 0}); 
    }); 

    return {graph, charges}; 
};




export const buildGraphFast = (linksData) => {

    // intialise maps 
    const graph = new Map(); 

    // building the graph with time as weight 
    linksData.forEach(({FromBIC, ToBIC, TimeTakenInMinutes}) => {
        // setting the value of frombic and tobic 
        if(!graph.has(FromBIC)) graph.set(FromBIC, []); 
        if(!graph.has(ToBIC)) graph.set(ToBIC, []); 

        graph.get(FromBIC).push({bank : ToBIC, time : TimeTakenInMinutes }) 
    }); 

    return {graph}; 
}; 
    
 
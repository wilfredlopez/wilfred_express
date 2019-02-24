var addNumbers = (a,b) =>{
    return a + b
}

it("Should add 2 numbers", ()=>{
    
    var res = addNumbers(1,1);

    if(res !== 2){
        throw new Error(`Expected 2 and got ${res}`);
    }
});
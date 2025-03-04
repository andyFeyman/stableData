export default function combineL1Data(dailyList, basicList) {

    const basicMap = new Map(basicList.map(item => [item.l1Name, item])); 

    return dailyList.map(itemA => {
      const sameItem = basicMap.get(itemA.l1Name);
      if (sameItem) {
        const { id, l1Name, ...rest } = sameItem;
        return { ...itemA, ...rest };
      }
      return itemA;
    });
  }

// function combineL1Data (dailyList,basicList) {

//     return dailyList.map(itemA =>{

//         const sameItem = basicList.find(itemB =>itemB.l1Name === itemA.l1Name)

//         if(sameItem){
//             const {id,l1Name,...rest} = sameItem;
//             return {...itemA, ...rest};
//         }
       
//         return itemA;
//     });

// };
// const combinData = combineL1Data(dailyList,basicList);

// console.log(combinData);


//export default combineL1Data;
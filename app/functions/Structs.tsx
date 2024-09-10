export interface jsonDict<TValue> {
    [id: string]: TValue;
  }

export const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;//format: d-m-y;
}

export const IDict : jsonDict<string> = {
    "Movement": "e703-ecb6-5ce7-aec1",
    "Toughness": "d29d-cf75-fc2d-34a4",
    "Save": "450-a17e-9d5e-29da",
    "Wounds": "750a-a2ec-90d3-21fe",
    "Leadership":"58d2-b879-49c7-43bc",
    "OC":"bef7-942a-1a23-59f8",
    "Range":"914c-b413-91e3-a132",
    "Attacks":"2337-daa1-6682-b110",
    "WS":"95d1-95f-45b4-11d6",
    "Strength":"ab33-d393-96ce-ccba",
    "AP":"41a0-1301-112a-e2f2",
    "Damage":"3254-9fe6-d824-513e",
    "Keywords":"893f-9000-ccf7-648e",
    "Cost":"51b2-306e-1021-d207",
    "Description":"9b8f-694b-e5e-b573"
  
  }
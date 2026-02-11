import {importCSV} from "../api/userApi";

function ImportCSV({reload}){

const upload=(e)=>{

importCSV(e.target.files[0])
.then(reload);

};

return(

<input
type="file"
onChange={upload}
/>

);

}

export default ImportCSV;

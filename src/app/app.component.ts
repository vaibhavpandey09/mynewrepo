import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  excelData:any;
  userList:Array<any> = [];
  obj={};
  constructor(private http:HttpClient){

  }

  ngOnInit(){
    this.http.get('https://mybucketforjson.s3.ap-south-1.amazonaws.com/users.json').subscribe(res=>{
      // this.obj=JSON.stringify(res[users]);
      // console.log(this.obj);
      //  this.userList=this.userList.concat(res['users']);
      this.userList=this.userList.concat(res);

    });
  }

 userDetails=new FormGroup({
  id:new FormControl(),
  name:new FormControl(''),
  username:new FormControl(''),
  email:new FormControl('')
 })


    submitDetails(){
      console.log(this.userDetails.value);
      let arr:Array<any>=[];
      arr[0]=this.userDetails.value;
     this.userList=this.userList.concat(arr);
     console.log(this.userList);
    }



    // exportExcel(){
    //   let element=document.getElementById('excel-table');
    //   const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    //   const wb:XLSX.WorkBook=XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
    //   XLSX.writeFile(wb,"ExcelSheet.xlsx");
    // }

    exportExcel(u:any){
      console.log(u);
      // console.log(JSON.stringify(u));
      // let userJson = JSON.stringify(u);
      let arr:Array<any>=[];
      arr[0]=u;
      
      const ws:XLSX.WorkSheet=XLSX.utils.json_to_sheet(arr);
      const wb:XLSX.WorkBook=XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws,"Sheet1");
      console.log(arr);
       XLSX.writeFile(wb,"ExcelSheet1.xlsx");
    }

    readExcel(event:any){
      console.log(event);
      let file=event.target.files[0];

      let fileReader= new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload=(e)=>{
        var workBook=XLSX.read(fileReader.result,{type:'binary'});
        var sheetNames=workBook.SheetNames;
        this.excelData=XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
        console.log(this.excelData);
        this.userList=this.userList.concat(this.excelData);
        console.log(this.userList);

      }

    }
}

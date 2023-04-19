import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDetail } from 'src/app/interfaces/資料結構';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  storeData: Array<IDetail> = [];
  radioBtnFormGroup: FormGroup = new FormGroup({
    dataSelect: new FormControl(false)
  });
  selectedData: IDetail = {
    no: -1,
    producer: '',
    category: '',
    basePrice: '',
    salePrice: ''
  }
  
  constructor() { }

  ngOnInit(): void {
    this.storeData.push({
      no: 1,
      producer: 'producerX',
      category: 'categoryA',
      basePrice: '12',
      salePrice: '35'
    })
    this.storeData.push({
      no: 2,
      producer: 'producerY',
      category: 'categoryB',
      basePrice: '70',
      salePrice: '120'
    })
  }

  clickRadioBtn(dataIndex: number){
    this.selectedData = this.storeData[dataIndex]
  }

  add(value: IDetail){
    const {no, ...other} = value
    this.storeData.push({no: this.storeData.length + 1, ...other});
    this.resetStatus();
  }
  edit(value: IDetail){
    const editDataIndex = this.storeData.findIndex(data => data.no == value.no);

    this.storeData[editDataIndex] = value;
    this.resetStatus();
  }
  clear(){
    this.storeData = [];
    this.resetStatus();
  }
  delete(index: number){
    for (let i = index; i < this.storeData.length-1; i++) {
      this.storeData[i] = this.storeData[i+1];
      this.storeData[i].no = i + 1;
    }
    this.storeData.pop();
    this.resetStatus();
  }


  resetStatus(){
    this.radioBtnFormGroup.reset();
    this.selectedData = {
      no: -1,
      producer: '',
      category: '',
      basePrice: '',
      salePrice: ''
    };
  }
  

}

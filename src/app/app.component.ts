import { Component, OnInit } from '@angular/core';
import * as metaData from 'src/assets/formMetaData';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  formsMetaData:any[]=metaData.formsMetaData;
  masterForm:FormGroup;
  showFormReviewData:boolean=false;
  title = 'formsAssignmentSuresh';

  constructor(private fb:FormBuilder){
    this.masterForm=this.fb.group({
      steps:this.fb.array([])
    })
  }

  get steps():FormArray{
    return this.masterForm.get('steps') as FormArray;
  }

  createFormElement(inputElement:any):FormControl|FormArray{
    let validations=[];
    if(inputElement.Required){
      validations.push(Validators.required);
    }
    if(inputElement.Length){
      validations.push(Validators.max(inputElement.Length))
    }
    if(inputElement.Type=='checkbox'){
      return this.fb.array([],validations);
    }else{
      return this.fb.control('',validations);
    }
  }

  initializeForm(){
    this.formsMetaData.forEach(stepData=>{
      if(this.formsMetaData.indexOf(stepData)==0){
        stepData.isVisible=true;
      }
      let group={}
      stepData.Controls.forEach((inputElementData)=>{
        group[inputElementData.Field]=this.createFormElement(inputElementData);
      })
      this.steps.push(this.fb.group(group))
    })
  }

  ngOnInit(): void {
    this.initializeForm();
    console.log(this.steps);
  }

  onCheckBoxChange(event,stepIndex,formControlName){
    let formArray:FormArray=this.steps.at(stepIndex).get(formControlName) as FormArray;
    let presentValue=formArray.value;
    let index=presentValue.findIndex((value)=>{
      if(value==event.target.value){
        return true;
      }
    })
    console.log(index);
    console.log("index");
    if(index!=-1){
      if(!event.target.checked){
        formArray.removeAt(index);
      }
    }else{
      formArray.push(this.fb.control(event.target.value));
    }
  }


  showNextStep(currentStepIndex){
    this.formsMetaData[currentStepIndex].isVisible=false;
    if(currentStepIndex !=this.formsMetaData.length-1){
      this.formsMetaData[currentStepIndex+1].isVisible=true;
    }
    if(currentStepIndex ==this.formsMetaData.length-1){
      this.showFormReviewData=true;
    }
  }

  onSubmit(){
    console.log(this.masterForm.value);
    this.masterForm=this.fb.group({
      steps:this.fb.array([])
    });
    this.initializeForm();
    alert("the formvalue has been printed in the console");
    this.showFormReviewData=false;
  }
}

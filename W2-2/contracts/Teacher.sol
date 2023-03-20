// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './IScore.sol';
import './Student.sol';

contract Teacher {
    
    address owner;

    string teacherName;

    StudentObj[] public studentList;

    struct StudentObj{
        address addr;
        string name;
    }

    modifier onlyOwner{
        require(msg.sender == owner,"You are not the teacher");
        _;
    }

    constructor(string memory _name){
        owner = msg.sender;
        teacherName = _name;
    }

    function createStudent(string memory _name) public onlyOwner returns(address){
        StudentObj memory stuObj;
        stuObj.name = _name;
        Student student = new Student();
        stuObj.addr = address(student);

        studentList.push(stuObj);

        return address(student);
    }

    function modifyScore(address _student,uint _score) public onlyOwner{
        IScore student = IScore(_student);
        student.setScore(_score);
    }

    function getStudentScore(address _student) public view returns(uint){
        IScore student = IScore(_student);
        return student.getScore();
    }

    function getStudentListSize() public view returns(uint){
        return studentList.length;
    }
}
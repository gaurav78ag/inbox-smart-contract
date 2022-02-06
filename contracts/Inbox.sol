pragma solidity ^0.4.17; //>=0.7.0 <0.9.0;

contract Inbox{
    string public message;

     constructor(string initialMassage) public {
        message = initialMassage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}


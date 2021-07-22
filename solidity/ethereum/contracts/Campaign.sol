pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address []) {
        return deployedCampaigns;
    }
}

contract Campaign {
    address public manager;
    uint public minimumContribution;
    // address[] public approvers;
    
    struct Request {
        string description;
        uint value;
        address recepient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address creator) public{
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recepient) public restricted {
        
        Request memory newRequest = Request({
            description: description,
            value:value,
            recepient: recepient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);
        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        require(!requests[index].complete);
        require(requests[index].approvalCount > (approversCount/2));
        
        requests[index].recepient.transfer(requests[index].value);
        requests[index].complete = true;
    }
    
}
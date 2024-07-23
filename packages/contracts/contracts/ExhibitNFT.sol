// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/* Category: Smart Contract
   Purpose: Manages Non-Fungible Tokens (NFTs) representing individual exhibits, ensuring ownership and access rights for event participants. */

import "erc721a/contracts/ERC721A.sol";
import "./EventEscrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ExhibitNFT is ERC721A, Ownable {
    uint256 public ticketPrice;
    EventEscrow public escrow;
    string public baseURI;
    uint8 public ticketCapacity;

    string public location;
    address public artifactNFTAddress;
    string public details;

    event TicketsMinted(address exhibit, address to, uint8 quantity, uint256 startTokenId);

    // Define the event
    event ExhibitCreated(
        string name,
        string symbol,
        uint256 ticketPrice,
        EventEscrow escrow,
        address owner,
        string baseURI,
        string location,
        address artifactNFTAddress,
        string details,
        uint8 ticketCapacity
    );

    /**
     * @dev Constructor to initialize the ExhibitNFT contract.
     * @param name Name of the NFT.
     * @param symbol Symbol of the NFT.
     * @param _ticketPrice Price of a single ticket.
     * @param _escrow Escrow contract address.
     * @param _owner Owner address.
     * @param _baseURI Base URI for NFT metadata.
     * @param _location Location of the exhibit.
     * @param _artifactNFTAddress Address of the related artifact NFT.
     * @param _details Additional details about the exhibit.
     * @param _ticketCapacity Maximum number of tickets that can be minted.
     */

    constructor(
        string memory name,
        string memory symbol,
        uint256 _ticketPrice,
        EventEscrow _escrow,
        address _owner,
        string memory _baseURI,
        string memory _location,
        address _artifactNFTAddress,
        string memory _details,
        uint8 _ticketCapacity
    ) ERC721A(name, symbol) Ownable(_owner) {
        ticketPrice = _ticketPrice;
        escrow = _escrow;
        baseURI = _baseURI;
        ticketCapacity = _ticketCapacity;

        location = _location;
        artifactNFTAddress = _artifactNFTAddress;
        details = _details;

        // Emit the event
        emit ExhibitCreated(
            name,
            symbol,
            _ticketPrice,
            _escrow,
            _owner,
            _baseURI,
            _location,
            _artifactNFTAddress,
            _details,
            _ticketCapacity
        );
    }

    /** 
     * @dev Mints tickets in batch to the specified address.
     * @param to Address to mint the tickets to.
     * @param quantity Number of tickets to mint.
     * @return startTokenId The ID of the first token minted.
     */

    function mintTickets(address to, uint8 quantity) external onlyOwner returns (uint256) {
        require (totalSupply() + quantity <= ticketCapacity, "Exceeds maximum tickets");
        uint256 startTokenId = _nextTokenId();
        _mint(to, quantity);

        emit TicketsMinted(address(this), to, quantity, startTokenId);
        return startTokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/* Category: Smart Contract
   Purpose: Acts as the central hub for curating exhibits and managing event logistics, including ticket sales and participant access. */

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ExhibitNFT.sol";

contract Museum is Ownable {
    IERC20 public usdcToken;
    mapping(string => ExhibitNFT) public exhibits;

    event ExhibitCurated(
        address museumAddress,
        string exhibitId,
        address exhibitAddress
    );
    event TicketsPurchased(address buyer, address exhibit, uint8 quantity, uint256 startTokenId);
    event TicketsPurchasedBatch(address buyer, address exhibit, address[] recipients, uint8[] quantities, uint256[] startTokenIds);
    // emmit an event with the contract address, token address, and owner address
    event MuseumCreated(
        address museumAddress,
        address tokenAddress,
        address ownerAddress
    );

    constructor(IERC20 _usdcToken) Ownable(msg.sender) {
        usdcToken = _usdcToken;
        // emmit an event with the contract address, token address, and owner address
        emit MuseumCreated(address(this), address(usdcToken), owner());
    }

    /**
     * @dev Curates a new exhibit.
     * @param exhibitId The unique identifier for the exhibit.
     * @param exhibit The ExhibitNFT contract for the exhibit.
     */

    function curateExhibit(
        string memory exhibitId,
        ExhibitNFT exhibit
    ) external onlyOwner {
        exhibits[exhibitId] = exhibit;

        emit ExhibitCurated(address(this), exhibitId, address(exhibit));
    }

     /**
     * @notice Purchases tickets for a single buyer.
     * @param exhibitId The unique identifier for the exhibit.
     * @param quantity The number of tickets to purchase.
     * @param usdcAmount The amount of USDC sent to purchase the tickets.
     */
    function purchaseTickets(string memory exhibitId, uint8 quantity, uint256 usdcAmount) external {
        ExhibitNFT exhibit = exhibits[exhibitId];
        require(address(exhibit) != address(0), "Exhibit does not exist.");

        uint256 totalCost = exhibit.ticketPrice() * quantity;
        require(usdcAmount >= totalCost, "Insufficient tokens sent.");

        address escrowAddress = address(exhibit.escrow());
        require(usdcToken.transferFrom(msg.sender, escrowAddress, totalCost), "Token transfer failed.");

        address[] memory recipients = new address[](1);
        recipients[0] = msg.sender;
        uint8[] memory quantities = new uint8[](1);
        quantities[0] = quantity;

        uint256[] memory startTokenIds = exhibit.mintTickets(recipients, quantities);
        emit TicketsPurchased(msg.sender, address(exhibit), quantity, startTokenIds[0]);
    }

    /**
     * @notice Purchases tickets for multiple recipients.
     * @param exhibitId The unique identifier for the exhibit.
     * @param recipients Array of recipient addresses.
     * @param quantities Array of ticket quantities for each recipient.
     * @param usdcAmount The total amount of USDC sent to purchase the tickets.
     */
    function purchaseTicketsBatch(
        string memory exhibitId,
        address[] calldata recipients,
        uint8[] calldata quantities,
        uint256 usdcAmount
    ) external {
        require(recipients.length == quantities.length, "Mismatched recipients and quantities");

        ExhibitNFT exhibit = exhibits[exhibitId];
        require(address(exhibit) != address(0), "Exhibit does not exist.");

        uint256 totalQuantity = 0;
        uint256 totalCost = 0;

        for (uint256 i = 0; i < recipients.length; i++) {
            totalQuantity += quantities[i];
            totalCost += exhibit.ticketPrice() * quantities[i];
        }

        require(usdcAmount >= totalCost, "Insufficient tokens sent.");
        require(exhibit.totalSupply() + totalQuantity <= exhibit.ticketCapacity(), "Exceeds maximum tickets");

        address escrowAddress = address(exhibit.escrow());
        require(usdcToken.transferFrom(msg.sender, escrowAddress, totalCost), "Token transfer failed.");

        uint256[] memory startTokenIds = exhibit.mintTickets(recipients, quantities);

        emit TicketsPurchasedBatch(msg.sender, address(exhibit), recipients, quantities, startTokenIds);
    }


    function verifyTicketOwnership(
        string memory exhibitId,
        address user
    ) external view returns (bool) {
        ExhibitNFT exhibit = exhibits[exhibitId];
        return exhibit.balanceOf(user) > 0;
    }
}
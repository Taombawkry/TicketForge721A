import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ExhibitNFT } from "../typechain-types";

describe("Museum Contract Tests", function() {
  async function deployContracts() {
    const [
      owner,
      controller,
      beneficiary1,
      beneficiary2,
      funder,
      buyer
    ] = await ethers.getSigners();

    // Deploy USDC token (or another ERC20 token)
    const MockUSDC = await ethers.getContractFactory("MUSDC");
    const usdcToken = await MockUSDC.connect(buyer).deploy(ethers.parseUnits("1000", 6));

    const Museum = await ethers.getContractFactory("Museum");
    const museum = await Museum.connect(owner).deploy(usdcToken.target);

     // Deploy ArtifactNFT contract (or another ERC721 token)
     const ArtifactNFT = await ethers.getContractFactory("ArtifactNFT");
     const artifactNFT = await ArtifactNFT.connect(owner).deploy("ArtifactNFT", "ANFT", owner, "https://api.example.com/nft/");
 
    // Deploy EventOrganizerService with the deployed Museum and USDC token addresses
    const EventOrganizerService = await ethers.getContractFactory("EventOrganizerService");
    const organizerService = await EventOrganizerService.deploy(museum.target, usdcToken.target);

    await organizerService.organizeExhibit(
     
      "ExhibitName", // name
      "EXB", // symbol
      ethers.parseUnits("50", 6),
      [beneficiary1.address, beneficiary2.address], // beneficiaries
      [50, 50], // shares
      "https://api.example.com/nft/", // baseURI
      "Lusaka,Zambia", // location
      artifactNFT.target, // ArtifactNFT address
      "Lusaka Art Gallery", // collection
      "Exhibit1", // exhibit id
       100 // ticketCapacity
    );

    await organizerService.organizeExhibit(
      
      "ExhibitName2", //name
      "EX2", //symbol
      ethers.parseUnits("50", 6), //price
      [beneficiary1.address, beneficiary2.address, funder.address], //beneficiaries
      [50, 50, 50], //shares,
      "https://api.example.com/nft/",
      "Lusaka,Zambia",
      artifactNFT.target,
      "Lusaka Art Gallery2",
      "Exhibit2",
       200 
    );

    const exhibit1NFTAddress = await organizerService.exhibits("Exhibit1");
    const exhibit2NFTAddress = await organizerService.exhibits("Exhibit2");
    await museum.connect(owner).curateExhibit("WestWing", exhibit1NFTAddress);

    return {
      museum,
      organizerService,
      beneficiary1,
      beneficiary2,
      exhibit1NFTAddress,
      exhibit2NFTAddress,
      owner,
      buyer,
      usdcToken
    };
  }

  it("should correctly deploy a mock erc20 token", async function() {
    
    const { museum, owner, exhibit1NFTAddress, exhibit2NFTAddress } = await loadFixture(
      deployContracts
    );

    const MockUSDC = await ethers.getContractFactory("MUSDC");
    const usdcToken = await MockUSDC.connect(owner).deploy(ethers.parseUnits("200", 6));
      expect(await usdcToken.symbol()).to.equal("USDCM");
      expect(await usdcToken.name()).to.equal("USDC Mock");
      expect(await usdcToken.decimals()).to.equal(18);
      expect(await usdcToken.balanceOf(owner.address)).to.equal(ethers.parseUnits("200", 6));
  });

  it("should correctly curate an exhibit", async function() {
    
    const { museum, owner, exhibit1NFTAddress, exhibit2NFTAddress } = await loadFixture(
      deployContracts
    );

    

    await museum.connect(owner).curateExhibit("EastWing", exhibit2NFTAddress);
    expect(await museum.exhibits("EastWing")).to.equal(exhibit2NFTAddress);
  });

  it("should override an existing exihibit if owner", async function() {
    const { museum, owner, exhibit1NFTAddress, exhibit2NFTAddress } = await loadFixture(
      deployContracts
    );
    await museum.connect(owner).curateExhibit("WestWing", exhibit2NFTAddress);
    expect(await museum.exhibits("WestWing")).to.equal(exhibit2NFTAddress);
  });

  it("should NOT override an existing exihibit if not owner", async function() {
    const { museum, buyer, exhibit1NFTAddress, exhibit2NFTAddress } = await loadFixture(
      deployContracts
    );
    await expect(
      museum.connect(buyer).curateExhibit("WestWing", exhibit2NFTAddress)
    ).to.be.revertedWithCustomError(museum, "OwnableUnauthorizedAccount");
    expect(await museum.exhibits("WestWing")).to.equal(exhibit1NFTAddress);
  });

  it("should allow purchasing a single ticket", async function() {
    const { museum, buyer, usdcToken } = await loadFixture(deployContracts);
    const ticketQuantity = 1;
    const ticketPrice = ethers.parseUnits("50", 6) 
    await usdcToken.connect(buyer).approve(museum.target, ticketPrice * BigInt(ticketQuantity));
    const tx00 = await museum.connect(buyer).purchaseTickets("WestWing", ticketQuantity, ticketPrice * BigInt(ticketQuantity)); 
    const receipt = await tx00

    const ExhibitNFT = await ethers.getContractFactory("ExhibitNFT");
    const exhibit = await ExhibitNFT.attach(await museum.exhibits("WestWing")) as ExhibitNFT;
    expect(await exhibit.balanceOf(buyer.address)).to.equal(ticketQuantity);

    console.log(`Gas used for single ticket purchase: ${receipt?.gasUsed}`);
    console.log(`Gas price at execution: ${receipt?.gasPrice}`);
    // Further assertions can be added here like balance checking in ExhibitNFT and emitted events
  });

  it("should allow purchasing multiple tickets in batch", async function() {
    const { museum, buyer, usdcToken } = await loadFixture(deployContracts);
    const ticketQuantity = 5;
    const ticketPrice = ethers.parseUnits("50", 6);
    const totalCost = ticketPrice * BigInt(ticketQuantity);

    await usdcToken.connect(buyer).approve(museum.target, totalCost);

    const recipients = Array(ticketQuantity).fill(buyer.address);
    const quantities = Array(ticketQuantity).fill(1);

    console.log("recipients:", recipients, "quantities:", quantities );

    const tx01 = await museum.connect(buyer).purchaseTicketsBatch("WestWing", recipients, quantities, totalCost);
    const receipt = await tx01.wait();
    
    const ExhibitNFT = await ethers.getContractFactory("ExhibitNFT");
    const exhibit = ExhibitNFT.attach(await museum.exhibits("WestWing")) as ExhibitNFT;
    expect(await exhibit.balanceOf(buyer.address)).to.equal(ticketQuantity);

    console.log(`Gas used for batch ticket purchase: ${receipt?.gasUsed}`);
    console.log(`Gas price at execution: ${receipt?.gasPrice}`);
  });

  it("should fail when trying to purchase tickets in batch exceeding capacity", async function() {
    const { museum, buyer, usdcToken, exhibit1NFTAddress } = await loadFixture(deployContracts);

    const exhibit = await ethers.getContractAt("ExhibitNFT", exhibit1NFTAddress);
    const ticketCapacity = await exhibit.ticketCapacity();
    const ticketPrice = ethers.parseUnits("50", 6);

    const excessQuantity = ticketCapacity + BigInt(1);
    const totalCost = ticketPrice * excessQuantity;

    await usdcToken.connect(buyer).approve(museum.target, totalCost);

    const recipients = Array(Number(excessQuantity)).fill(buyer.address);
    const quantities = Array(Number(excessQuantity)).fill(1);

    await expect(
      museum.connect(buyer).purchaseTicketsBatch("WestWing", recipients, quantities, totalCost)
    ).to.be.revertedWith("Exceeds maximum tickets");
  });

  it("should verify ownership of a single purchased ticket", async function() {
    const { museum, buyer, usdcToken, exhibit1NFTAddress } = await loadFixture(deployContracts);

    console.log("exhibit: ", await museum.exhibits("WestWing"), exhibit1NFTAddress);

    const ticketQuantity = 1;
    const ticketPrice = ethers.parseUnits("50", 6);
    
    await usdcToken.connect(buyer).approve(museum.target, ticketPrice * BigInt(ticketQuantity));
    await museum.connect(buyer).purchaseTickets("WestWing", ticketQuantity, ticketPrice * BigInt(ticketQuantity));
    // const hasTicket = ;
     expect( await museum.verifyTicketOwnership("WestWing", buyer.address)).to.be.true;
  });

  it("should correctly update the escrow balance after a single ticket purchase", async function() {
    const { museum, buyer, usdcToken, organizerService, exhibit1NFTAddress } = await loadFixture(
      deployContracts
    );

    // Getting the escrow address associated with the exhibit
    const exhibit = new ethers.Contract(
      exhibit1NFTAddress,
      ["function escrow() view returns(address)"],
      buyer
    );
    const escrowAddress = await exhibit.escrow();

    // Approving the Museum contract to spend buyer's USDC
    await usdcToken.connect(buyer).approve(museum.target, ethers.parseUnits("50", 6));
    
    const ticketQuantity = 1
    const ticketPrice = ethers.parseUnits("50", 6);

    // Buying a ticket
    await museum.connect(buyer).purchaseTickets("WestWing", ticketQuantity, ticketPrice * BigInt(ticketQuantity));

    // Check that the escrow balance has been updated
    const escrowBalance = await usdcToken.balanceOf(escrowAddress);
    expect(escrowBalance).to.equal(ethers.parseUnits("50", 6));
  });

  it("should correctly update the escrow balance after batch ticket purchase", async function() {
    const { museum, buyer, usdcToken, exhibit1NFTAddress } = await loadFixture(deployContracts);

    const exhibit = await ethers.getContractAt("ExhibitNFT", exhibit1NFTAddress);
    const escrowAddress = await exhibit.escrow();

    const ticketQuantity = 3;
    const ticketPrice = ethers.parseUnits("50", 6);
    const totalCost = ticketPrice * BigInt(ticketQuantity);

    await usdcToken.connect(buyer).approve(museum.target, totalCost);

    const recipients = Array(ticketQuantity).fill(buyer.address);
    const quantities = Array(ticketQuantity).fill(1);

    await museum.connect(buyer).purchaseTicketsBatch("WestWing", recipients, quantities, totalCost);

    const escrowBalance = await usdcToken.balanceOf(escrowAddress);
    expect(escrowBalance).to.equal(totalCost);
  });


  it("should correctly update the escrow balance after funds are distributed", async function() {
    const { museum, buyer, usdcToken, organizerService, exhibit1NFTAddress, beneficiary1 } = await loadFixture(
      deployContracts
    );
    // Buying a ticket
    const ticketQuantity = 1;
    const ticketPrice = ethers.parseUnits("50", 6);
    
    await usdcToken.connect(buyer).approve(museum.target, ticketPrice * BigInt(ticketQuantity));
    await museum.connect(buyer).purchaseTickets("WestWing", ticketQuantity, ticketPrice * BigInt(ticketQuantity));

    // Getting the escrow address associated with the exhibit
    // Getting the escrow address associated with the exhibit
    const exhibit = new ethers.Contract(
      exhibit1NFTAddress,
      ["function escrow() view returns(address)"],
      buyer
    );
    const escrowAddress = await exhibit.escrow();
    const eventEscrow = await ethers.getContractAt("EventEscrow", escrowAddress);

    const escrowBalanceBefore = await usdcToken.balanceOf(await exhibit.escrow());
    expect(escrowBalanceBefore).to.equal(ethers.parseUnits("50", 6));

    // Approving the Museum contract to spend buyer's USDC
    await eventEscrow.connect(beneficiary1).distributePayments();
    
    // Check that the escrow balance has been updated
    const escrowBalanceAfter = await usdcToken.balanceOf(await exhibit.escrow());
    expect(escrowBalanceAfter).to.equal(ethers.parseUnits("0", 6));
  });
});

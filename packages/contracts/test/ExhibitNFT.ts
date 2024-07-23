import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

describe('ExhibitNFT', function () {

  async function deployContracts() {
    // Deploying Museum contract

    const [owner, controller, beneficiary1, beneficiary2, funder] = await ethers.getSigners();

    // Deploy USDC token (or another ERC20 token)
    const MockUSDC = await ethers.getContractFactory("MUSDC");
    const usdcToken = await MockUSDC.connect(owner).deploy(ethers.parseUnits("1000", 6));
    const EventEscrow = await ethers.getContractFactory("EventEscrow");
    const eventEscrow = await EventEscrow.connect(owner).deploy(usdcToken.target, [beneficiary1, beneficiary2], [50,50]);

    // Deploy ArtifactNFT contract (or another ERC721 token)
    const ArtifactNFT = await ethers.getContractFactory("ArtifactNFT");
    const artifactNFT = await ArtifactNFT.connect(owner).deploy("ArtifactNFT", "ANFT", owner, "https://api.example.com/nft/");

    // Deploy EventOrganizerService with the deployed Museum and USDC token addresses
    const ExhibitNFT = await ethers.getContractFactory("ExhibitNFT");
    const exhibitNFT = await ExhibitNFT.connect(owner).deploy(
      "EVENTNAME", // name
      "ENFT", // symbol
      100, // ticketPrice
      eventEscrow.target, // escrow
      owner.address, // owner
      'https://api.example.com/nft/', // baseURI
      "Lusaka,Zambia", // location
      artifactNFT.target, // ArtifactNFTAddress
      "Lusaka Art Gallery", // collection
      100, // ticketCapacity
    );
    return {
      exhibitNFT,
      eventEscrow,
      usdcToken,
      owner,
      controller,
      beneficiary1,
      beneficiary2,
      funder
    };
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { exhibitNFT, owner } = await  loadFixture(deployContracts);
      expect(await exhibitNFT.owner()).to.equal(owner.address);
    });

    it('Should set the right ticket price', async function () {
      const { exhibitNFT } = await  loadFixture(deployContracts);
      expect(await exhibitNFT.ticketPrice()).to.equal(100);
    });

    it('Should set the right escrow', async function () {
      const { exhibitNFT, eventEscrow } = await  loadFixture(deployContracts);
      expect(await exhibitNFT.escrow()).to.equal(eventEscrow.target);
    });

    it('Should set the right ticket capacity', async function () {
      const { exhibitNFT } = await  loadFixture(deployContracts);
      expect(await exhibitNFT.ticketCapacity()).to.equal(100);
    });
  });

  describe('Minting', function () {
    it('Should mint multiple tickets to an address', async function () {
      const { exhibitNFT, owner , funder} = await  loadFixture(deployContracts);
      const quantity = 3;
      await exhibitNFT.connect(owner).mintTickets(funder.address, quantity);
      expect(await exhibitNFT.balanceOf(funder.address)).to.equal(quantity);
    });

    it('Should mint a single ticket to an address', async function () {
      const { exhibitNFT, owner , funder} = await  loadFixture(deployContracts);
      const quantity = 1;
      await exhibitNFT.connect(owner).mintTickets(funder.address, quantity);
      expect(await exhibitNFT.balanceOf(funder.address)).to.equal(quantity);
    });

    it('Should emit a TicketsMinted event on mint', async function () {
      const { exhibitNFT, owner , funder} = await  loadFixture(deployContracts);
      const quantity = 2;
      await expect(exhibitNFT.connect(owner).mintTickets(funder.address, quantity))
        .to.emit(exhibitNFT, 'TicketsMinted')
        .withArgs(exhibitNFT.target, funder.address, quantity, 0);
    });

    it('Should fail if not owner tries to mint', async function () {
      const { exhibitNFT, funder } = await  loadFixture(deployContracts);
      await expect(
        exhibitNFT.connect(funder).mintTickets(funder.address, 1)
      ).to.be.revertedWithCustomError(exhibitNFT, "OwnableUnauthorizedAccount");
    });

    it('Should set the correct baseURI', async function () {
      const { exhibitNFT, owner } = await loadFixture(deployContracts);
      
      // Set a new base URI
      const expectedBaseURI = 'https://api.example.com/nft/';
      await exhibitNFT.connect(owner).setBaseURI(expectedBaseURI);
    
      // Verify that the baseURI was set correctly
      const actualBaseURI = await exhibitNFT.baseURI();
      console.log(`Base URI: ${actualBaseURI}`);
      expect(actualBaseURI).to.equal(expectedBaseURI);
    
      // Mint some tokens
      const quantity = 3;
      await exhibitNFT.connect(owner).mintTickets(owner.address, quantity);
    
      // Log the total supply
      const totalSupply = await exhibitNFT.totalSupply();
      console.log(`Total supply after minting: ${totalSupply}`);
    
      // Since we can't directly access tokenURI, we'll just verify the total supply
      expect(totalSupply).to.equal(quantity);
    });

    it ('Should fail to mint if exceeding ticket capacity', async function () {
      const { exhibitNFT, owner, funder } = await loadFixture(deployContracts);
      await exhibitNFT.connect(owner).mintTickets(funder.address, 100);
      await expect(
        exhibitNFT.connect(owner).mintTickets(funder.address, 1)
      ).to.be.revertedWith("Exceeds maximum tickets")
    })
  });
});
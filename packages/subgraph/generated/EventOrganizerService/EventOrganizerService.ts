// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ArtifactNFTDeployed extends ethereum.Event {
  get params(): ArtifactNFTDeployed__Params {
    return new ArtifactNFTDeployed__Params(this);
  }
}

export class ArtifactNFTDeployed__Params {
  _event: ArtifactNFTDeployed;

  constructor(event: ArtifactNFTDeployed) {
    this._event = event;
  }

  get artifactNFTAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get symbol(): string {
    return this._event.parameters[2].value.toString();
  }

  get ownerAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get baseURI(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class ExhibitNFTDeployed extends ethereum.Event {
  get params(): ExhibitNFTDeployed__Params {
    return new ExhibitNFTDeployed__Params(this);
  }
}

export class ExhibitNFTDeployed__Params {
  _event: ExhibitNFTDeployed;

  constructor(event: ExhibitNFTDeployed) {
    this._event = event;
  }

  get exhibitId(): string {
    return this._event.parameters[0].value.toString();
  }

  get exhibitNFTAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get escrowAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get museumAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class EventOrganizerService extends ethereum.SmartContract {
  static bind(address: Address): EventOrganizerService {
    return new EventOrganizerService("EventOrganizerService", address);
  }

  exhibits(param0: string): Address {
    let result = super.call("exhibits", "exhibits(string):(address)", [
      ethereum.Value.fromString(param0)
    ]);

    return result[0].toAddress();
  }

  try_exhibits(param0: string): ethereum.CallResult<Address> {
    let result = super.tryCall("exhibits", "exhibits(string):(address)", [
      ethereum.Value.fromString(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getExhibitNFTAddress(_id: string): Address {
    let result = super.call(
      "getExhibitNFTAddress",
      "getExhibitNFTAddress(string):(address)",
      [ethereum.Value.fromString(_id)]
    );

    return result[0].toAddress();
  }

  try_getExhibitNFTAddress(_id: string): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getExhibitNFTAddress",
      "getExhibitNFTAddress(string):(address)",
      [ethereum.Value.fromString(_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  museum(): Address {
    let result = super.call("museum", "museum():(address)", []);

    return result[0].toAddress();
  }

  try_museum(): ethereum.CallResult<Address> {
    let result = super.tryCall("museum", "museum():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  usdcToken(): Address {
    let result = super.call("usdcToken", "usdcToken():(address)", []);

    return result[0].toAddress();
  }

  try_usdcToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("usdcToken", "usdcToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _museum(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _usdcToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DeployArtifactNFTCall extends ethereum.Call {
  get inputs(): DeployArtifactNFTCall__Inputs {
    return new DeployArtifactNFTCall__Inputs(this);
  }

  get outputs(): DeployArtifactNFTCall__Outputs {
    return new DeployArtifactNFTCall__Outputs(this);
  }
}

export class DeployArtifactNFTCall__Inputs {
  _call: DeployArtifactNFTCall;

  constructor(call: DeployArtifactNFTCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get owner(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get baseURI(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class DeployArtifactNFTCall__Outputs {
  _call: DeployArtifactNFTCall;

  constructor(call: DeployArtifactNFTCall) {
    this._call = call;
  }
}

export class OrganizeExhibitCall extends ethereum.Call {
  get inputs(): OrganizeExhibitCall__Inputs {
    return new OrganizeExhibitCall__Inputs(this);
  }

  get outputs(): OrganizeExhibitCall__Outputs {
    return new OrganizeExhibitCall__Outputs(this);
  }
}

export class OrganizeExhibitCall__Inputs {
  _call: OrganizeExhibitCall;

  constructor(call: OrganizeExhibitCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get ticketPrice(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get beneficiaries(): Array<Address> {
    return this._call.inputValues[3].value.toAddressArray();
  }

  get shares(): Array<BigInt> {
    return this._call.inputValues[4].value.toBigIntArray();
  }

  get baseURI(): string {
    return this._call.inputValues[5].value.toString();
  }

  get location(): string {
    return this._call.inputValues[6].value.toString();
  }

  get artifactNFTAddress(): Address {
    return this._call.inputValues[7].value.toAddress();
  }

  get details(): string {
    return this._call.inputValues[8].value.toString();
  }

  get exhibitId(): string {
    return this._call.inputValues[9].value.toString();
  }
}

export class OrganizeExhibitCall__Outputs {
  _call: OrganizeExhibitCall;

  constructor(call: OrganizeExhibitCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

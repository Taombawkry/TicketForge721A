/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  ConversionContract,
  ConversionContractInterface,
} from "../../contracts/ConversionContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_uniswapRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdt",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdc",
        type: "address",
      },
      {
        internalType: "address",
        name: "_storageContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "storageContract",
        type: "address",
      },
    ],
    name: "Conversion",
    type: "event",
  },
  {
    inputs: [],
    name: "controller",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMinimum",
        type: "uint256",
      },
    ],
    name: "convertUSDTtoUSDC",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialApprove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swapRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdt",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdc",
        type: "address",
      },
      {
        internalType: "address",
        name: "_storageContract",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_storageContract",
        type: "address",
      },
    ],
    name: "setStorageContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "storageContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapRouter",
    outputs: [
      {
        internalType: "contract ISwapRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdc",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdt",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516108e13803806108e183398101604081905261002f91610055565b50505050506100ba565b80516001600160a01b038116811461005057600080fd5b919050565b600080600080600060a0868803121561006d57600080fd5b61007686610039565b945061008460208701610039565b935061009260408701610039565b92506100a060608701610039565b91506100ae60808701610039565b90509295509295909350565b610818806100c96000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80633e413bee116100665780633e413bee14610111578063495cd72214610124578063c31c9c071461012c578063dc38b0a21461013f578063f77c47911461016f57600080fd5b80630d8503061461009857806311ce0267146100be5780631459457a146100e95780632f48ab7d146100fe575b600080fd5b6100ab6100a6366004610563565b610182565b6040519081526020015b60405180910390f35b6004546100d1906001600160a01b031681565b6040516001600160a01b0390911681526020016100b5565b6100fc6100f73660046105a1565b610360565b005b6002546100d1906001600160a01b031681565b6003546100d1906001600160a01b031681565b6100fc610418565b6000546100d1906001600160a01b031681565b6100fc61014d366004610606565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b6001546100d1906001600160a01b031681565b6001546000906001600160a01b031633146101b85760405162461bcd60e51b81526004016101af90610628565b60405180910390fd5b604080516002808252606082018352600092602083019080368337505060025482519293506001600160a01b0316918391506000906101f9576101f9610674565b6001600160a01b03928316602091820292909201015260035482519116908290600190811061022a5761022a610674565b6001600160a01b039092166020928302919091018201526040516000916102539184910161068a565b60408051601f198184030181526000805460a0850184528285526004546001600160a01b039081166020870152929550909391169163c04b8d599190810161029c42600f6106d7565b8152602001898152602001888152506040518263ffffffff1660e01b81526004016102c7919061071c565b6020604051808303816000875af11580156102e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061030a919061078b565b60045460408051898152602081018490529293506001600160a01b03909116917faaa4b2048061a375cf651aa7fc1f1dd79339417406b0b83d0722ad30d312b327910160405180910390a2925050505b92915050565b6001546001600160a01b0316156103b95760405162461bcd60e51b815260206004820181905260248201527f436f6e74726f6c6c65722068617320616c7265616479206265656e207365742e60448201526064016101af565b600080546001600160a01b03199081166001600160a01b03978816179091556001805482169587169590951790945560028054851693861693909317909255600380548416918516919091179055600480549092169216919091179055565b6001546001600160a01b031633146104425760405162461bcd60e51b81526004016101af90610628565b600254600054610461916001600160a01b039081169116600019610463565b565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b17905291516000928392908716916104bf91906107a4565b6000604051808303816000865af19150503d80600081146104fc576040519150601f19603f3d011682016040523d82523d6000602084013e610501565b606091505b509150915081801561052b57508051158061052b57508080602001905181019061052b91906107c0565b61055c5760405162461bcd60e51b8152602060048201526002602482015261534160f01b60448201526064016101af565b5050505050565b6000806040838503121561057657600080fd5b50508035926020909101359150565b80356001600160a01b038116811461059c57600080fd5b919050565b600080600080600060a086880312156105b957600080fd5b6105c286610585565b94506105d060208701610585565b93506105de60408701610585565b92506105ec60608701610585565b91506105fa60808701610585565b90509295509295909350565b60006020828403121561061857600080fd5b61062182610585565b9392505050565b6020808252602c908201527f4f6e6c792074686520636f6e74726f6c6c65722063616e20706572666f726d2060408201526b3a3434b99030b1ba34b7b71760a11b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b6020808252825182820181905260009190848201906040850190845b818110156106cb5783516001600160a01b0316835292840192918401916001016106a6565b50909695505050505050565b8082018082111561035a57634e487b7160e01b600052601160045260246000fd5b60005b838110156107135781810151838201526020016106fb565b50506000910152565b602081526000825160a0602084015280518060c08501526107448160e08601602085016106f8565b60018060a01b0360208601511660408501526040850151606085015260608501516080850152608085015160a085015260e0601f19601f8301168501019250505092915050565b60006020828403121561079d57600080fd5b5051919050565b600082516107b68184602087016106f8565b9190910192915050565b6000602082840312156107d257600080fd5b8151801515811461062157600080fdfea264697066735822122020377fba186529bc3349c422fc6fc9f09d916d229d8888573d98716e414cf70f64736f6c63430008150033";

type ConversionContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConversionContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ConversionContract__factory extends ContractFactory {
  constructor(...args: ConversionContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _uniswapRouter: AddressLike,
    _controller: AddressLike,
    _usdt: AddressLike,
    _usdc: AddressLike,
    _storageContract: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _uniswapRouter,
      _controller,
      _usdt,
      _usdc,
      _storageContract,
      overrides || {}
    );
  }
  override deploy(
    _uniswapRouter: AddressLike,
    _controller: AddressLike,
    _usdt: AddressLike,
    _usdc: AddressLike,
    _storageContract: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _uniswapRouter,
      _controller,
      _usdt,
      _usdc,
      _storageContract,
      overrides || {}
    ) as Promise<
      ConversionContract & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ConversionContract__factory {
    return super.connect(runner) as ConversionContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConversionContractInterface {
    return new Interface(_abi) as ConversionContractInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ConversionContract {
    return new Contract(address, _abi, runner) as unknown as ConversionContract;
  }
}

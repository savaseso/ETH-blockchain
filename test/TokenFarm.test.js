const { assert } = require('chai')
require('web3')

const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
    .use(require('chai-as-promised'))
    .should()

    function tokens(n){
        return web3.utils.toWei(n, 'ether')
    }

    contract("TokenFarm", ([owner,investor])=>{
        //write tests here
        let daiToken, dappToken, tokenFarm
        before(async ()=>{
            daiToken = await DaiToken.new()
            dappToken = await DappToken.new()
            tokenFarm = await TokenFarm.new(dappToken.address,daiToken.address)
            //transfer all Dapp token to farm (1million)
            await dappToken.transfer(tokenFarm.address,'1000000000000000000000000')
            //send tokens to investor
            await daiToken.transfer(investor,tokens('100'),{from:owner})
        })
        describe('Mock DAI  deployment', async ()=>{
            it('has a name', async ()=>{
               const name = await daiToken.name()
               assert.equal(name, "Mock DAI Token")
            })
        })
        describe('Dapp token deployment', async ()=>{
            it('has a name', async ()=>{
               const name = await dappToken.name()
               assert.equal(name, "DApp Token")
            })
        })
        describe('Token Farm  deployment', async ()=>{
            it('has a name', async ()=>{
               const name = await tokenFarm.name()
               assert.equal(name, "Dapp Token Farm")
            })
            it('contract has tokens', async ()=>{
               let balance = await dappToken.balanceOf(tokenFarm.address)
               
               assert.equal(balance.toString(), tokens('1000000'))
            })
        })
        describe('Farming tokens', async ()=>{
            it('it rewards  investors staking mDai tokens', async ()=>{
              let results;

              //check investor balance before staking
              results = await daiToken.balanceOf(investor)
              assert.equal(results.toString(),tokens('100')),'investor mockDai wallet balance correct for staking ';

              //stake mock dai tokens 
              await daiToken.approve(tokenFarm.address, tokens('100'), {from: investor})
              await tokenFarm.stakeTokens( tokens('100'), {from: investor})

              //check staking result 
              results = await daiToken.balanceOf(investor);
              assert.equal(results.toString(),tokens('0'),'investor Mock dai wallet balance correct after staking')
              results = await daiToken.balanceOf(investor);
              assert.equal(results.toString(),tokens('0'),' token Farm mock dai   balance correct after staking')
            })
        })
    })
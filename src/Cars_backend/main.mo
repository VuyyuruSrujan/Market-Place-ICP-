import Result from "mo:base/Result";
import Buffer from "mo:base/Buffer";
import HashMap from "mo:base/HashMap";
import Iter from "mo:base/Iter";
import Principal from "mo:base/Principal";
import Option from "mo:base/Option";
import Nat64 from "mo:base/Nat64";
import Time from "mo:base/Time";
import Array from "mo:base/Array";
import Text from "mo:base/Text";

actor {
  public type UserDet = {
    name: Text;
    phoneNumber: Nat64;
    address: Text;
    email: Text;
    principal: Principal;
  };

  let userDetails = HashMap.HashMap<Principal, UserDet>(0, Principal.equal, Principal.hash);
  let ledger = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);

  public func mint(owner: Principal, amount: Nat): async Result<(), Text> {
    let balance = Option.get(ledger.get(owner), 0);
    ledger.put(owner, balance + amount);
    return #ok();
  };

  public query func balanceOf(owner: Principal): async Nat {
    return Option.get(ledger.get(owner), 0);
  };

  public shared func transfer(from: Principal, to: Principal, amount: Nat): async Result<(), Text> {
    // Implement error handling and potential race condition prevention
    let balanceFrom = Option.get(ledger.get(from), 0);
    let balanceTo = Option.get(ledger.get(to), 0);
    if (balanceFrom < amount) {
      return #err("Insufficient balance to transfer");
    };
    ledger.put(from, balanceFrom - amount);
    ledger.put(to, balanceTo + amount);
    return #ok();
  };

  public func burn(owner: Principal, amount: Nat): async Result<(), Text> {
    // Implement error handling
    let balance = Option.get(ledger.get(owner), 0);
    if (balance < amount) {
      return #err("Insufficient balance to burn");
    };
    ledger.put(owner, balance - amount);
    return #ok();
  };

  public func addUser(det: UserDet): async Result<(), Text> {
    userDetails.put(det.principal, det);
    ledger.put(det.principal, 100);
    return #ok();
  };

  public func removeUser(principal: Principal): async Result<(), Text> {
    userDetails.delete(principal);
    ledger.delete(principal);
    return #ok();
  };

  public shared query func getAllUsers(): async [UserDet] {
    // Consider pagination for large datasets
    return Iter.toArray(userDetails.values());
  };

  public shared query func getUserDetByPrincipal(principal: Principal): async ?UserDet {
    return userDetails.get(principal);
  };
}

import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
  public type UserDet = {
    Name: Text;
    PHNO: Nat64;
    address:Text;
    MAIL:Text;
    Princi:Principal;
    };

    var userDetails: [UserDet] = [];
    let ledger = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    public func mint(owner : Principal, amount : Nat) : async Result<(), Text> {
        let balance = Option.get(ledger.get(owner), 0);
        ledger.put(owner, balance + amount);
        return #ok();
    };

    public query func balanceOf(owner : Principal) : async Nat {
      return (Option.get(ledger.get(owner), 0));
    };

    public shared ({ caller }) func transfer(from : Principal, to : Principal, amount : Nat) : async Result<(), Text> {
      let balanceFrom = Option.get(ledger.get(from), 0);
      let balanceTo = Option.get(ledger.get(to), 0);
      if (balanceFrom < amount) {
        return #err("Insufficient balance to transfer");
      };
      ledger.put(from, balanceFrom - amount);
      ledger.put(to, balanceTo + amount);
      return #ok();
    };
    
    public func burn(owner : Principal, amount : Nat) : async Result<(), Text> {
      let balance = Option.get(ledger.get(owner), 0);
      if (balance < amount) {
          return #err("Insufficient balance to burn");
      };
      ledger.put(owner, balance - amount);
      return #ok();
    };

    public func addUser(det: UserDet): async Text {
      userDetails := Array.append<UserDet>(userDetails, [det]);
      ledger.put(det.Princi,100);
      return "successfully entered";
    };


    public func RemoveAllUsersData(): async Text{
      userDetails:= [];
      return "Data deleted"
    };

    public shared query func getAllUsers(): async [UserDet] {
      return userDetails;
    };

    public shared query func getUserDetByPrincipal(Princi: Principal): async ?UserDet {
      return Array.find<UserDet>(userDetails, func x = x.Princi == Princi);
    };

}
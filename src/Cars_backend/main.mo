import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
// import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Nat64 "mo:base/Nat64";
// import Time "mo:base/Time";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

shared ({ caller = initializer }) actor class () {
  public type UserDet = {
    Name : Text;
    PHNO : Nat64;
    address : Text;
    MAIL : Text;
    Princi : Principal;
  };

  var userDetails = Buffer.Buffer<UserDet>(10);
  let admin : Principal = initializer;
  let ledger = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);
  public type Result<Ok, Err> = Result.Result<Ok, Err>;

  public shared ({ caller }) func mint(owner : Principal, amount : Nat) : async Result<(), Text> {
    if (admin != caller) {
      return #err("Only admin can mint");
    };
    let balance = Option.get(ledger.get(owner), 0);
    ledger.put(owner, balance + amount);
    return #ok();
  };

  public query func balanceOf(owner : Principal) : async Nat {
    return (Option.get(ledger.get(owner), 0));
  };

  public shared ({ caller }) func transfer(from : Principal, to : Principal, amount : Nat) : async Result<(), Text> {
    if (caller != from) {
      return #err("You can only transfer tokens you own");
    };
    let balanceFrom = Option.get(ledger.get(from), 0);
    let balanceTo = Option.get(ledger.get(to), 0);
    if (balanceFrom < amount) {
      return #err("Insufficient balance to transfer");
    };
    ledger.put(from, balanceFrom - amount);
    ledger.put(to, balanceTo + amount);
    return #ok();
  };

  public shared ({ caller }) func burn(owner : Principal, amount : Nat) : async Result<(), Text> {
    if (admin != caller) {
      return #err("Only admin can burn");
    };
    let balance = Option.get(ledger.get(owner), 0);
    if (balance < amount) {
      return #err("Insufficient balance to burn");
    };
    ledger.put(owner, balance - amount);
    return #ok();
  };

  public shared({caller}) func addUser(det : UserDet) : async Result<Text,Text> {
    if (det.Princi != caller){
      Debug.print(debug_show(caller));
      return #err("Principal of new user does not match the caller's principal.")
    };
    let userExists : ?UserDet = Array.find<UserDet>(Buffer.toArray<UserDet>(userDetails), func x = x.Princi == det.Princi);
    if (userExists != null) {
      return #err("User already exists");
    };
    userDetails.add(det);
    ledger.put(det.Princi, 100);
    return #ok("successfully entered");
  };

  public shared ({caller}) func RemoveAllUsersData() : async Result<Text, Text> {
    if (admin != caller) {
      return #err("Only admin can mint");
    };
    userDetails.clear();
    return #ok("Data deleted");
  };

  public shared query func getAllUsers() : async [UserDet] {
    return Buffer.toArray<UserDet>(userDetails);
  };

  public shared query func getUserDetByPrincipal(Princi : Principal) : async Result<UserDet,Text> {
    let user : ?UserDet = Array.find<UserDet>(Buffer.toArray<UserDet>(userDetails), func x = x.Princi == Princi);
    switch (user) {  
    case (null) #err("User not found");  
    case (?user) #ok(user);  
  }  
  };

};

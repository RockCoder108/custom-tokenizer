class SimpleTokenizer {
  constructor() {
    this.charToToken = {};
    this.tokenToChar = {};
    //this.tokenId = 1;

    let tokenId = 1;

    // let onlyLowercase = {a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,u,v,w,x,y,z} no need beasuse this String.fromCharCode(97+i)

    // onlyLowercase
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(97 + i);
      this.charToToken[char] = tokenId; // this.tokenId;
      this.tokenToChar[tokenId] = char;
      tokenId++; // this.tokenId++;
    }

    // Uppercase letters (A=27, B=28, ..., Z=52)
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i); // 'A' to 'Z'
      this.charToToken[char] = tokenId;
      this.tokenToChar[tokenId] = char;
      tokenId++;
    }

    // Numbers (0=53, 1=54, ..., 9=62)
    for (let i = 0; i < 10; i++) {
      const char = i.toString();
      this.charToToken[char] = tokenId;
      this.tokenToChar[tokenId] = char;
      tokenId++;
    }




    // sam

    // Common special characters
    const specialChars = [
      " ",
      ".",
      ",",
      "!",
      "?",
      ";",
      ":",
      "-",
      "_",
      "@",
      "#",
      "$",
      "%",
      "&",
      "*",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      "+",
      "=",
      "/",
      "\\",
      "|",
      "<",
      ">",
      '"',
      "'",
    ];

    for (const char of specialChars) {
      this.charToToken[char] = tokenId;
      this.tokenToChar[tokenId] = char;
      tokenId++;
    }
  }

  encode(text) {
    const letter = [...text];
    const tokens = [];
    for (let i = 0; i < letter.length; i++) {
      const char = letter[i];
      if (this.charToToken[char]) {
        tokens.push(this.charToToken[char]);
      } else {
        tokens.push(0);
      }
    }
    return tokens.join(" "); // return number as string
  }

  decode(text) {
    const numbers = text.split(" "); // [...text];           // This splits "12 3 4" into characters like ["1","2"," ","3"," ","4"] ❌.   But we want to split into numbers (["12","3","4"]).
    const tokens = [];
    for (let i = 0; i < numbers.length; i++) {
      const num = parseInt(numbers[i]); // numbers[i];    // convert string → number
      if (this.tokenToChar[num]) {
        tokens.push(this.tokenToChar[num]);
      } else {
        tokens.push("?");
      }
    }
    return tokens.join("");
  }
}
const tokenizer = new SimpleTokenizer();
// console.log(tokenizer.encode("abc"));
console.log(tokenizer.decode("1 2 3"));

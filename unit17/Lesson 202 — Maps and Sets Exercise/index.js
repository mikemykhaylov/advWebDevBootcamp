class MessageBoard {
  constructor() {
    this.messages = new Map();
    this.id = 1;
  }

  addMessage(message) {
    this.messages.set(this.id, message);
    this.id += 1;
    return this;
  }

  findMessageById(id) {
    return this.messages.get(id);
  }

  findMessageByValue(message) {
    for (const msg of this.messages.values()) {
      if (msg === message) return message;
    }
    return undefined;
  }

  removeMessage(key) {
    this.messages.delete(key);
    return this;
  }

  numberOfMessages() {
    return this.messages.size;
  }

  messagesToArray() {
    return Array.from(this.messages.values());
  }
}
function uniqueValues(arr) {
  return new Set(arr).size;
}
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}
function countPairs(arr, sum) {
  const cache = new Set(arr);
  let count = 0;
  for (const val of arr) {
    cache.delete(val);
    if (cache.has(sum - val)) {
      count += 1;
    }
  }
  return count;
}

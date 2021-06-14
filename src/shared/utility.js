// Utility function that updates an old JS object with a new one
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

// Validity check function
export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

// Set new id given a list of items with existing ids
export const setNewId = (items) => {
  let newId = null;
  const idList = items.map((el) => el.id);
  // set new id for item that does not already exist
  for (let n in [...Array(items.length + 2).keys()]) {
    if (!idList.includes(parseInt(n)) && parseInt(n) !== 0) {
      newId = parseInt(n);
      break;
    }
  }
  return newId;
};

// Calculate sub-total and total
export const calculateTotals = (items, service, gst) => {
  // Sub-total
  const subTtl = items
    .map((el) => el.itemPrice)
    .reduce((prev, curr) => prev + curr);
  // Total
  const totalService =
    parseFloat(subTtl) + (service / 100) * parseFloat(subTtl);
  const ttl = totalService + (gst / 100) * totalService;
  return {
    subTtl: subTtl.toFixed(2),
    ttl: ttl.toFixed(2),
  };
};

// Set new person ID
export const setNewPersonId = (people) => {
    let newId = null;
    const idList = people.map(el => el.id);
    // set new id for item that does not already exist            
    for (let n in [...Array(people.length + 2).keys()]) {
        if (!idList.includes(parseInt(n)) && parseInt(n) !== 0) {
            newId = parseInt(n);
            break;
        }
    }
    return newId;
}

// Get item attribute (e.g. name / price)
export const getItemAttribute = (items, itemId, attrName) => {
    const itemIdIndex = items.map(el => el.id).indexOf(itemId);
    return items[itemIdIndex][attrName];
}

// Get person's share details
export const getPersonSharesDetails = (people, personId) => {
    const personIdIndex = people.map(el => el.id).indexOf(personId);
    const personShares = people[personIdIndex].shares;
    const personSharesIdList = personShares.map(el => el.itemId);
    return {
        personIdIndex: personIdIndex,
        personShares: personShares,
        personSharesIdList: personSharesIdList
    };
}

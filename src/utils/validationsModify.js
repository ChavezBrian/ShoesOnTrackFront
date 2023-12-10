const regPrice = /^\d*\,?\d*$/;
const regStock = /^[0-9]+([0-9]+)?$/;

export default function validateModify(inputs) {
  let errors = {};
  if (inputs.name.length < 5 || inputs.name.length > 20) {
    errors.name = "The name must be between 5 and 20 characters";
  }
  if (!inputs.name) errors.name = "A Name must be entered";
  if (!inputs.price) errors.price = "A Price must be entered";
  if (!regPrice.test(inputs.price))
    errors.price = "A Price must be a number";
  if (!inputs.description) errors.description = "A Description must be entered";
  if (inputs.description.length > 300) errors.description = "The description cannot contain more than 300 characters";
  if (!inputs.image || (typeof inputs.image === "string" && inputs.image.length === 0)) {
    errors.image = "An Image must be entered";
  }
  if (!inputs.category) errors.category = "You must select a shoe Category";
  if (!inputs.stock) errors.stock = "A Stock must be entered";
  if (!regStock.test(inputs.stock)) errors.stock = "A Stock must be a number";
  if (inputs.sizes.length === 0) errors.sizes = "A Size must be entered";



  return errors;
}

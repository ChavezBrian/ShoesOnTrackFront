export default function validateForm(inputs) {
  let errors = {};
  if (!inputs.name) errors.name = "A Name must be entered";
  if (!inputs.brandName) errors.brandName = "A Brand Name must be entered";
  if (!inputs.price) errors.price = "A Price must be entered";
  if (!inputs.description) errors.description = "A Description must be entered";
  if (!inputs.image) errors.image = "A Image must be entered";
  if (!inputs.category) errors.category = "You must select a shoe Category";
  if (!inputs.color) errors.color = "A Color must be entered";
  if (!inputs.details) errors.details = "A Detail must be entered";
  if (!inputs.stock) errors.stock = "A Stock must be entered";
  if (!inputs.sizes) errors.sizes = "A Size must be entered";

  return errors;
}

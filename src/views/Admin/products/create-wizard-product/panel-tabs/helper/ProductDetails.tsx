import { enumToOptions } from "@/views/Admin/utils/enumOptions";
import { useTabContext } from "@/common/components/Tab/TabContext";
import { UseLocalContext } from "@/core/context/UseLocalContext";
import { ProductEntity } from "@/features/product/domain/entities";
import { ProductState, ProductTax, ProductVisibility } from "@/features/product/domain/enums";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProduct } from "@/features/product/infrastructure/driving-adapter/hooks/useProduct";
import { useParams } from "react-router-dom";


export const ProductDetailsHelper = () => {
    const { getById } = useProduct();
    const { id: product_id } = useParams()
    const edit_product = getById(product_id!)

    const { changeTab } = useTabContext();

    const { productCreate, setStateProduct } = UseLocalContext()

    const statusProductOptions = enumToOptions(ProductState);
    const visibilityProductOptions = enumToOptions(ProductVisibility);
    const taxAplicableOptions = enumToOptions(ProductTax);

    const validation :any = useFormik({
        initialValues: {            
            quantity:  1,
            sku: edit_product ? edit_product.product?.sku : "",
            brand: edit_product ? edit_product.product?.brand : "",
            price: edit_product ? edit_product.product?.price : 0,
            discount: edit_product ? edit_product.product?.discount : 0,
            product_tax: edit_product ? edit_product.product?.product_tax : "INCLUDE_PRICE",
            publish_date_time: edit_product ? edit_product.product?.publish_date_time : new Date(),
            status: edit_product ? edit_product.product?.status : "AVAILABLE",
            visibility: edit_product ? edit_product.product?.visibility : "DRAFT",
            tags: edit_product ? edit_product.product?.tags : ""
        },
        validationSchema: Yup.object().shape({            
            quantity: Yup.number()
                .positive("A quantity can't start with a minus")
                .integer("A quantity can't include a decimal point")
                .required('A quantity is required'),
            sku: Yup.string().required("SKU is required."),
            brand: Yup.string().required("Brand is required."), 
            price: Yup.number()
                .positive("A price can't start with a minus")
                .integer("A price can't include a decimal point")
                .required('A price is required'),
            discount: Yup.number()
                .integer("A discount can't include a decimal point")
                .required('A discount is required'),
            product_tax: Yup.string().required("Tax is required"),            
            publish_date_time: Yup.string().required("publish_date_time is required"),            
            status: Yup.string().required("Status is required"),            
            visibility: Yup.string().required("Visibility is required"),            
            tags: Yup.string().required("Tags is required"),          
        }),
        onSubmit: (values: any) => {            
            const newProduct : ProductEntity = {
                ...productCreate,
                ...values,
            }
            setStateProduct(newProduct)
        },
    });

    const handleTaxAplicableOptionsChange = (selectedOption: any) => {
        validation.setFieldValue('product_tax', selectedOption ? selectedOption.value : '');
    };

    const handleStatusProductOptionsChange = (selectedOption: any) => {
        validation.setFieldValue('status', selectedOption ? selectedOption.value : '');
    };

    const handleVisibilityProductOptionsChange = (selectedOption: any) => {
        validation.setFieldValue('visibility', selectedOption ? selectedOption.value : '');
    };

    const handlePublishDateTimeOptionsChange = (target: any) => {
        console.log(target)

        // validation.setFieldValue('publish_date_time', selectedOption ? selectedOption.value : '');
    };

    const onHandleSubmitForm = async (event: any) => {
        event.preventDefault();
        validation.handleSubmit()
        if(Object.keys(validation.errors).length === 0){
            changeTab("product-images")
        }
    }

    return {
        validation,
        onHandleSubmitForm,
        taxAplicableOptions, handleTaxAplicableOptionsChange,
        statusProductOptions, handleStatusProductOptionsChange,
        visibilityProductOptions, handleVisibilityProductOptionsChange, 
        handlePublishDateTimeOptionsChange,
    }
}
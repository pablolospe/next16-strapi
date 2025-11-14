'use server'

import { type FormState, SignupFormSchema } from "@/validations/auth";
import z from "zod";


export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
    console.log('Hello for Register User action');

    const fields = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const validatedFields = SignupFormSchema.safeParse(fields)

    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error)

        console.log('Validation errors:', flattenedErrors.fieldErrors);

        return {
            success: false,
            message: 'Validation error',
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }
    console.log('Validation successfull');
    console.log('fields:', fields);


    return {
        success: true,
        message: 'Validation successfull',
        strapiErrors: null,
        zodErrors: null,
        data: fields,
    }
}
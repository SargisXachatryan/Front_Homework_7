import axios from "axios"
import { useForm } from "react-hook-form"
import Types from 'prop-types'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

export const AddUser = ({ onAdd }) => {

    const schema = yup.object().shape({
        name: yup.string().required(),
        surname: yup.string().required(),
        salary:yup.number().required()
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })

    const handleAdd = data => {
        console.log(data);
        axios
            .post("http://localhost:3004/users", { ...data, salary: +data.salary })
            .then(res => {
                onAdd(res.data);
                reset()
            })
    }

    return <div>
        <h1>AddUser</h1>
        <form onSubmit={handleSubmit(handleAdd)}>
            {errors.name && <p style={{ color: 'red' }} >Please fill name</p>}
            <label>name</label>
            <input
                {...register("name", { required: true })}
                placeholder="name"
                required
            />

            {errors.surname && <p style={{ color: 'red' }}>Please fill surname</p>}
            <label>surname</label>
            <input
                {...register("surname", { required: true, minLength: 3 })}
                placeholder="surname"
                required
            />

            {errors.salary && <p style={{ color: 'red' }}>Please fill salary</p>}
            <label>salary</label>
            <input
                {...register("salary", { required: true })}
                placeholder="salary"
                required
            />

            <button>save</button>
        </form>
    </div>
}

AddUser.propTypes = {
    onAdd: Types.func
}
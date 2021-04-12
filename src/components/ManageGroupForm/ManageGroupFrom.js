import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { TextField, MenuItem, Button } from '@material-ui/core';
import { useState } from 'react';
import { fetchAllGroups, selectGroup } from "../../store/modules/groups/actions";
import request, { groups } from "../../service";
import { findParentGroup, showSwalToast } from "../../utils/utils";
import { RouteLink } from "../../store/modules/menu/menu";
import { push } from "connected-react-router";
import "./ManageGroupForm.scss"
import { cloneDeep } from "lodash";
import { AsyncButton } from "../AsyncButton/AsyncButton";


// fieldValues is a prop for passing the field values for when the form is opened in edit mode
// the required form of the object is
// {name: "value", location: "value", latitude: "value", longitude: "value", installationCode: "value", group: "value"}
const ManageGroupForm = ({
                             parentGroup,
                             push,
                             groupOptions,
                             fetchAllGroups,
                             selectedGroup,
                             groupTree,
                             selectGroup
                         }) => {

    const initialValues = {
        name: "",
        parentGroup: parentGroup?.groupId || '',
    }

    const [editMode, setEditMode] = useState(false);
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [async, setAsync] = useState(false);

    const transformGroupToForm = (group) => {

        const form = cloneDeep(group);

        const parentGroup = findParentGroup(group, groupTree?.subGroups || [])

        form.parentGroup = parentGroup?.groupId ?? '';
        form.name = group?.name ?? '';

        return form;
    }

    const transformFormToGroup = (form) => {
        return {
            Name: form.name ?? '',
            ParentGroup: form.parentGroup ?? ''
        }
    }

    useEffect(() => {

        if (!groupOptions?.length) {
            fetchAllGroups();
        }

        if (selectedGroup && groupOptions?.length > 0) {
            setValues(transformGroupToForm(selectedGroup));
        }

        setEditMode(Boolean(selectedGroup));

        return () => {
            selectGroup(null)
        }

    }, [fetchAllGroups, groupOptions?.length, selectedGroup])

    const validate = () => {
        let temp = {}

        if (values.name === "")
            temp.name = "This field is required"
        else
            temp.name = ""

        setErrors(temp)

        return Object.values(temp).every(x => x === "")
    }


    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const groupData = transformFormToGroup(values);

        console.log(groupData);

        if (validate()) {

            setAsync(true);

            if (editMode) {

                delete groupData.ParentGroup;

                request(groups + `/${selectedGroup?.groupId}`, 'PUT', groupData)
                    .then(r => {
                        console.log(r.data);
                        showSwalToast(`Uspješno editovana grupa '${groupData.Name}'`, 'success');
                        setValues(initialValues);
                    }).finally(() => {
                    setAsync(false)
                    push(RouteLink.Devices);
                })
            } else {
                request(groups + `/CreateGroup`, 'POST', groupData)
                    .then(r => {
                        console.log(r.data);
                        showSwalToast(`Uspješno kreirana grupa '${groupData.Name}'`, 'success');
                        setValues(initialValues);
                    }).finally(() => {
                    setAsync(false)
                    push(RouteLink.Devices);
                })
            }
        }
    }

    return (
        <form className="manage-device-form" onSubmit={handleSubmit}>
            <TextField variant="outlined" label="Naziv" name="name" value={values.name} onChange={handleInputChange}
                       {...(errors.name && { error: true, helperText: errors.name })} />

            <TextField
                variant="outlined"
                select
                disabled={editMode}
                name="parentGroup"
                value={values.parentGroup}
                label="Nadgrupa"
                onChange={handleInputChange}
                className="group-selector"
                {...(errors.group && { error: true, helperText: errors.group })}
            >
                {groupOptions.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                        {group.name}
                    </MenuItem>
                ))}
            </TextField>

            <div className={'buttons'}>
                <button className="custom-btn outlined" onClick={() => push(RouteLink.Devices)}>Otkaži</button>
                <AsyncButton className='custom-btn' async={async} onClick={handleSubmit}>
                    {editMode === true ? "Izmijeni grupu" : "Kreiraj grupu"}
                </AsyncButton>
            </div>
        </form>
    );
}

export default connect(state => {

    const groupsTree = state.groups.groups;

    const flatten = data => {

        return data.reduce((acc, group) => {
            acc.push(group);
            if (group?.subGroups?.length) {
                acc.push(...flatten(group.subGroups))
            }
            return acc;
        }, [])
    }

    const allGroups = groupsTree.subGroups ? flatten(groupsTree.subGroups) : [];

    const groupOptions = allGroups.map(g => ({
        id: g.groupId,
        name: g.name
    }))

    return {
        selectedGroup: state.groups.selectedGroup,
        groupTree: state.groups.groups,
        groupOptions
    }
}, { fetchAllGroups, push, selectGroup })(ManageGroupForm);

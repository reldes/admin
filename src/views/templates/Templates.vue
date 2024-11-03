<script>
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import { useSnackbar } from '@/plugins/snackbar';
import templates from '@/utils/helpers/api/templates';

export default {
    name: "Templates",
    components: {
        UiTitleCard
    },
    data: function () {
        return {
            createDialog: false,
            templates: [],
            newTemplate: {
                id: null,
                name: '',
                component: '',
                image: null
            },
            newTemplateErrors: {
                name: [],
                component: []
            }
        };
    },
    methods: {
        editTemplate(id) {
            this.createDialog = true;
            this.newTemplate = this.templates.find((experiment) => experiment.id === id);
        },
        validateFields() {
            this.newTemplateErrors.name = [];
            this.newTemplateErrors.component = [];

            if (!this.newTemplate.name) {
                this.newTemplateErrors.name.push('Title is required');
            }

            if (!this.newTemplate.component) {
                this.newTemplateErrors.content.push('Component is required');
            }

            return this.newTemplateErrors.name.length === 0 && this.newTemplateErrors.component.length === 0;
        },
        deleteTemplate(id) {
            templates.deleteTemplate(id).then(() => {
                this.templates = this.templates.filter((template) => template.id !== id);
                this.showSnackbar('Experiment deleted successfully', 'success');
            }).catch((error) => {
                console.log(error);
                this.showSnackbar(error || 'Failed to delete template', 'error');
            });
        },
        createTemplate() {
            if (!this.validateFields()) {
                this.showSnackbar('Please fix the errors before submitting', 'error');
                return;
            }
            try {
                if (this.newTemplate.name === '') {
                    throw new Error('Name is required');
                }
                const formData = new FormData();
                formData.append('name', this.newTemplate.name);
                console.log('formData', formData.get('name'));
                formData.append('component', this.newTemplate.component);
                if (this.newTemplate.image) {
                    formData.append('image', this.newTemplate.image[0]);
                }
                if (this.newTemplate.id) {
                    templates.updateTemplate(this.newTemplate.id, formData).then((response) => {
                        this.showSnackbar('Template updated successfully', 'success');
                        this.createDialog = false;
                        // templates.getTemplates().then((response) => {
                        //     this.templates = response;
                        // });
                    }).catch((error) => {
                        console.log(error);
                        this.showSnackbar(error || 'Failed to update template', 'error');
                        return;
                    });
                } else {
                    templates.createTemplate(formData).then((response) => {
                        this.templates.push(response);
                        this.showSnackbar('Template created successfully', 'success');
                        this.createDialog = false;
                    }).catch((error) => {
                        console.log(error);
                        this.showSnackbar(error || 'Failed to create template', 'error');
                        return;
                    });
                }
            } catch (error) {
                console.log(error);
                this.showSnackbar(error.message, 'error');
                return;
            }

        }
    },

    computed: {
    },
    created: function () {
        templates.getTemplates().then((response) => {
            this.templates = response;
        });
    },

    mounted: function () {
    },
    setup() {
        const { showSnackbar } = useSnackbar();
        return {
            showSnackbar
        };
    },
    watch: {
    }
};
</script>
<template>
    <div>
        <v-dialog max-width="500" v-model="createDialog">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn color="primary" v-bind="activatorProps" @click="newTemplate.id = null; newTemplate.image = null; newTemplate.name = null; newTemplate.component = null;" variant="outlined">
                    Create
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card :title="newTemplate.id ? 'Update template' : 'Create template'">
                    <v-card-text>
                        <v-container>
                            <v-row class="mb-3">

                                <v-text-field v-model="newTemplate.name" variant="outlined" label="Template name"
                                    :error-messages="newTemplateErrors.name" outlined required></v-text-field>

                            </v-row>
                            <v-row>

                                <v-textarea v-model="newTemplate.component" label="Template component"
                                    :error-messages="newTemplateErrors.component" variant="outlined"></v-textarea>

                            </v-row>
                            <v-row>
                                <v-file-input v-model="newTemplate.image" label="Upload Image" accept="image/*"
                                    :error-messages="newTemplateErrors.image" outlined></v-file-input>
                            </v-row>
                            <v-row class="mt-6">
                                <v-btn color="primary" @click="createTemplate"> {{ newTemplate.id ? 'Update' : 'Create' }}</v-btn>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="Close" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <UiTitleCard title="Templates" class-name="px-0 pb-0 rounded-md">
            <v-table class="bordered-table" hover density="comfortable">
                <thead class="bg-containerBg">
                    <tr>
                        <th class="text-left text-caption font-weight-bold text-uppercase">ID</th>
                        <th class="text-left text-caption font-weight-bold text-uppercase">Name</th>
                        <th class="text-right text-caption font-weight-bold text-uppercase">Component</th>
                        <th class="text-right text-caption font-weight-bold text-uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in templates" :key="index">
                        <td class="py-3">{{ item.id }}</td>
                        <td class="py-3">{{ item.name }}</td>
                        <td class="py-3">{{ item.component }}</td>
                        <td class="py-3" style="text-align: end;">
                            <v-btn class="mr-2" color="warning" @click="editTemplate(item.id)">Edit</v-btn>
                            <v-btn color="error" @click="deleteTemplate(item.id)">Delete</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </UiTitleCard>
    </div>
</template>

<style scoped></style>
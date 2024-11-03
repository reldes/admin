<script>
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import experiment from '@/utils/helpers/api/experiment';
import { useSnackbar } from '@/plugins/snackbar';
import templates from '@/utils/helpers/api/templates';
import {
    ClassicEditor,
    Alignment,
    Autoformat,
    Bold,
    Italic,
    Underline,
    BlockQuote,
    Base64UploadAdapter,
    CloudServices,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing,
    Indent,
    IndentBlock,
    Link,
    List,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    Table,
    TableColumnResize,
    TableToolbar,
    TextTransformation,
} from 'ckeditor5';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import 'ckeditor5/ckeditor5.css';

export default {
    name: "Experiments",
    components: {
        UiTitleCard, Ckeditor
    },
    data: function () {
        return {
            createDialog: false,
            experiments: [],
            templates: [],
            newExperiment: {
                id: null,
                title: '',
                description: '',
                template_id: null
            },
            newExperimentErrors: {
                title: [],
                description: []
            },
            editor: ClassicEditor,
            editorConfig: {
                plugins: [
                    Alignment,
                    Autoformat,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Essentials,
                    Heading,
                    Image,
                    ImageCaption,
                    ImageResize,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    Base64UploadAdapter,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    MediaEmbed,
                    Mention,
                    Paragraph,
                    PasteFromOffice,
                    PictureEditing,
                    Table,
                    TableColumnResize,
                    TableToolbar,
                    TextTransformation,
                    Underline,
                ],
                toolbar: [
                    'undo',
                    'redo',
                    '|',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'link',
                    'uploadImage',
                    'insertTable',
                    'blockQuote',
                    'mediaEmbed',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    'alignment',
                ],
            }
        };
    },
    methods: {
        validateFields() {
            this.newExperimentErrors.title = [];
            this.newExperimentErrors.description = [];

            if (!this.newExperiment.title) {
                this.newExperimentErrors.title.push('Title is required');
            }

            if (!this.newExperiment.description) {
                this.newExperimentErrors.description.push('Description is required');
            }

            return this.newExperimentErrors.title.length === 0 && this.newExperimentErrors.description.length === 0;
        },
        editExperiment(id) {
            this.createDialog = true;
            this.newExperiment = this.experiments.find((experiment) => experiment.id === id);
        },
        deleteExperiment(id) {
            experiment.deleteExperiment(id).then(() => {
                this.experiments = this.experiments.filter((experiment) => experiment.id !== id);
                this.showSnackbar('Experiment deleted successfully', 'success');
            }).catch((error) => {
                console.log(error);
                this.showSnackbar(error || 'Failed to delete experiment', 'error');
            });
        },
        createExperiment() {
            if (!this.validateFields()) {
                this.showSnackbar('Please fix the errors before submitting', 'error');
                return;
            }
            try {
                if (this.newExperiment.title === '') {
                    throw new Error('Title is required');
                }
                if (this.newExperiment.id) {
                    experiment.updateExperiment(this.newExperiment.id, this.newExperiment).then((response) => {
                        this.showSnackbar('Experiment updated successfully', 'success');
                        this.createDialog = false;
                        experiment.getExperiments().then((response) => {
                            this.experiments = response;
                        });
                    }).catch((error) => {
                        console.log(error);
                        this.showSnackbar(error || 'Failed to update experiment', 'error');
                        return;
                    });
                } else {
                    experiment.createExperiment(this.newExperiment).then((response) => {
                        this.experiments.push(response);
                        this.showSnackbar('Experiment created successfully', 'success');
                        this.createDialog = false;
                    }).catch((error) => {
                        console.log(error);
                        this.showSnackbar(error || 'Failed to create experiment', 'error');
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
        experiment.getExperiments().then((response) => {
            this.experiments = response;
        });
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
};
</script>
<template>
    <div>
        <v-dialog fullscreen v-model="createDialog">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn color="primary" v-bind="activatorProps" @click="newExperiment.id = null;
                newExperiment.template_id = null;
                newExperiment.description = '';
                newExperiment.title = '';" variant="outlined">
                    Create
                </v-btn>
            </template>
            <v-card>
                <v-toolbar>
                    <v-btn icon="mdi-close" @click="createDialog = false"></v-btn>
                </v-toolbar>
                <v-card :title="newExperiment.id ? 'Update experiment' : 'Create experiment'">
                    <v-card-text>
                        <v-container>
                            <v-row class="mb-3">

                                <v-text-field v-model="newExperiment.title" variant="outlined" label="Experiment name"
                                    :error-messages="newExperimentErrors.title" outlined required></v-text-field>

                            </v-row>
                            <v-row>
                                <ckeditor v-model="newExperiment.description" :editor="editor" :config="editorConfig" />

                            </v-row>
                            <v-row class="mb-3" v-if="templates.length">
                                <v-select v-model="newExperiment.template_id" :items="templates" item-title="name"
                                    item-value="id" label="Select Template" outlined single-line></v-select>
                            </v-row>
                            <v-row class="mt-6">
                                <v-btn color="primary" @click="createExperiment">{{newExperiment.id ? 'Update' : 'Create'}}</v-btn>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="Close" @click="createDialog = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-dialog>

        <UiTitleCard title="Experiments" class-name="px-0 pb-0 rounded-md">
            <v-table class="bordered-table" hover density="comfortable">
                <thead class="bg-containerBg">
                    <tr>
                        <th class="text-left text-caption font-weight-bold text-uppercase">ID</th>
                        <th class="text-left text-caption font-weight-bold text-uppercase">Title</th>
                        <th class="text-right text-caption font-weight-bold text-uppercase">Template</th>
                        <th class="text-right text-caption font-weight-bold text-uppercase">Link</th>
                        <th class="text-right text-caption font-weight-bold text-uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in experiments" :key="index">
                        <td class="py-3">{{ item.id }}</td>
                        <td class="py-3">{{ item.title }}</td>
                        <td class="py-3" style="text-align: end">{{ item.template?.name }}</td>
                        <td class="py-3"></td>
                        <td class="py-3" style="text-align: end;">
                            <v-btn class="mr-2" color="warning" @click="editExperiment(item.id)">Edit</v-btn>
                            <v-btn color="error" @click="deleteExperiment(item.id)">Delete</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </UiTitleCard>
    </div>
</template>

<style scoped>
::v-deep .ck.ck-editor {
    width: 100%;
    margin-bottom: 30px;
}
</style>
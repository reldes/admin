<script>
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import experiment from '@/utils/helpers/api/experiment';
import { useSnackbar } from '@/plugins/snackbar';

export default {
    name: "Experiments",
    components: {
        UiTitleCard
    },
    data: function () {
        return {
            createDialog: false,
            experiments: [],
            newExperiment: {
                title: '',
                description: ''
            },
            newExperimentErrors: {
                title: [],
                description: []
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
        createExperiment() {
            if (!this.validateFields()) {
                this.showSnackbar('Please fix the errors before submitting', 'error');
                return;
            }
            try {
                if (this.newExperiment.title === '') {
                    throw new Error('Title is required');
                }
                experiment.createExperiment(this.newExperiment).then((response) => {
                    this.experiments.push(response);
                    this.showSnackbar('Experiment created successfully', 'success');
                    this.createDialog = false;
                }).catch((error) => {
                    console.log(error);
                    this.showSnackbar(error || 'Failed to create experiment', 'error');
                    return;
                });
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
        <v-dialog max-width="500" v-model="createDialog">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn color="primary" v-bind="activatorProps" variant="outlined">
                    Create
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card title="Create experiment">
                    <v-card-text>
                        <v-container>
                            <v-row class="mb-3">

                                <v-text-field v-model="newExperiment.title" variant="outlined" label="Experiment name"
                                    :error-messages="newExperimentErrors.title" outlined required></v-text-field>

                            </v-row>
                            <v-row>

                                <v-textarea v-model="newExperiment.description" label="Description"
                                    :error-messages="newExperimentErrors.description" variant="outlined"></v-textarea>

                            </v-row>
                            <v-row class="mt-6">
                                <v-btn color="primary" @click="createExperiment">Create</v-btn>
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

        <UiTitleCard title="Recent Orders" class-name="px-0 pb-0 rounded-md">
            <v-table class="bordered-table" hover density="comfortable">
                <thead class="bg-containerBg">
                    <tr>
                        <th class="text-left text-caption font-weight-bold text-uppercase">ID</th>
                        <th class="text-left text-caption font-weight-bold text-uppercase">Title</th>
                        <th class="text-right text-caption font-weight-bold text-uppercase">Link</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in experiments" :key="index">
                        <td class="py-3">{{ item.id }}</td>
                        <td class="py-3">{{ item.title }}</td>
                        <td class="py-3"></td>
                    </tr>
                </tbody>
            </v-table>
        </UiTitleCard>
    </div>
</template>

<style scoped></style>
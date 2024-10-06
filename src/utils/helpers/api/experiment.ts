import request from "./request";

interface Experiment {
  id: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}


export default {
  getExperiments(): Promise<Experiment[]> {
    return request.get('experiments');
  },
  getExperiment(id: number): Promise<Experiment> {
    return request.get(`experiments/${id}`);
  },
  createExperiment(data: Experiment): Promise<Experiment> {
    return request.post('experiments', data);
  },
};
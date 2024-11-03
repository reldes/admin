import request from "./request";

interface Experiment {
  id: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  template?: Template;
}


interface Template {
  id: number;
  name: string;
  content: string;
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
  createExperiment(data: any): Promise<Experiment> {
    return request.post('experiments', data);
  },
  updateExperiment(id: number, data: any): Promise<Experiment> {
    return request.put(`experiments/${id}`, data);
  },
  deleteExperiment(id: number): Promise<Experiment> {
    return request.delete(`experiments/${id}`);
  }
};
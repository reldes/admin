import request from "./request";

interface Template {
  id: number;
  name: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}


export default {
  getTemplates(): Promise<Template[]> {
    return request.get('templates');
  },
  getTemplate(id: number): Promise<Template> {
    return request.get(`templates/${id}`);
  },
  createTemplate(data: any): Promise<Template> {
    return request.post('templates', data);
  },
  updateTemplate(id: number, data: any): Promise<Template> {
    return request.post(`templates/${id}`, data);
  },
  deleteTemplate(id: number): Promise<Template> {
    return request.delete(`templates/${id}`);
  }
};
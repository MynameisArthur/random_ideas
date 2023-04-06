import IdeasApi from '../services/ideasApi';
class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    [
      'business',
      'technology',
      'software',
      'inventions',
      'education',
      'health',
    ].forEach((elem) => this._validTags.add(elem));
  }
  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      thhis._ideas = res.data.data;
      console.log(this._ideas);
    } catch (error) {
      console.log(error);
    }
  }
  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }
  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        return `
        <div class="card">
            <button class="delete"><i class="fas fa-times"></i></button>
            <h3>
                ${idea.text}
            </h3>
            <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
            <p>
                Posted on <span class="date">${idea.date}</span> by
                <span class="author">${idea.username}</span>
            </p>
        </div>
        `;
      })
      .join('');
  }
}

export default IdeaList;
